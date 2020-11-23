/* store */
import { useStore } from '@store'

/* components */
import { Table, Avatar, Space } from 'antd'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import {
  ascend,
  assoc,
  descend,
  evolve,
  map,
  pipe,
  prop,
  reduce,
  slice,
  sort,
  times,
  values,
} from 'ramda'
import numberFormat from '@utils/number-format'

/* mapping */
import BossMapping, { BossObject } from '@mapping/bosses-crystal'
import MesosMapping from '@mapping/bosses-mesos'

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    render: (name, { avatar }) => (
      <Space>
        <Avatar shape="square" src={`/boss/${avatar}.png`} />
        {name}
      </Space>
    ),
  },
  {
    title: 'count',
    dataIndex: 'count',
    align: 'center',
  },
  {
    title: 'mesos',
    dataIndex: 'mesos',
    align: 'right',
  },
]

const toObject = reduce((data, boss) => assoc(boss.id, boss, data), {})
const defineMaxTime = (type, time) => (type === 'day' ? 7 : 1) * time

const WEEK_MAX = 60

const useTableData = (t) => {
  const [bossData] = useStore('boss')
  const convertBossData = toObject(bossData)
  const currentDefeatTotal = reduce(
    (total, { defeatTime = 0 }) => total + defeatTime,
    0
  )(bossData)
  const remainCount = WEEK_MAX - currentDefeatTotal
  const mergedData = pipe(
    reduce((data, boss) => {
      const storeBossData = convertBossData[boss.id] || {}
      const bossMesos = MesosMapping[boss.name][storeBossData.difficulty]
      if (storeBossData.defeatable) {
        let maxDefeatTime = defineMaxTime(boss.defeatType, boss.defeatTime)
        // has share enter time
        if (boss.enterShareId) {
          const sharedBoss = convertBossData[boss.enterShareId]
          const sharedBossData = BossObject[boss.enterShareId]
          const sharedBossMaxTime = defineMaxTime(
            sharedBossData.defeatType,
            sharedBossData.defeatTime
          )
          const bigMaxTime = Math.max(maxDefeatTime, sharedBossMaxTime)
          const withoutSelfRemainTime = bigMaxTime - sharedBoss.defeatTime
          maxDefeatTime = Math.min(maxDefeatTime, withoutSelfRemainTime)
          const sharedBossMesos = MesosMapping[boss.name][sharedBoss.difficulty]
          // reduce when shared boss
          if (sharedBossMesos > bossMesos) {
            maxDefeatTime =
              maxDefeatTime + sharedBoss.defeatTime - sharedBossData.defeatTime
          }
        }
        let remainDefeatTime = maxDefeatTime - storeBossData.defeatTime

        remainDefeatTime &&
          times(() => {
            data.push({
              id: boss.id,
              avatar: boss.name,
              name: boss.withoutDifficulty
                ? t(boss.name)
                : `${t(storeBossData.difficulty)}${t(boss.name)}`,
              mesos: bossMesos,
            })
          }, remainDefeatTime)
      }
      return data
    }, []),
    // grab most mesos 60 ahead
    sort(descend(prop('mesos'))),
    slice(0, remainCount),
    // aggrate data
    reduce((data, boss) => {
      const { id, name, avatar, mesos } = boss
      if (!data[id]) {
        data[id] = { id, name, avatar, count: 0, mesos: 0 }
      }
      data[id].count += 1
      data[id].mesos += mesos
      return data
    }, {}),
    values,
    sort(ascend(prop('mesos')))
  )(BossMapping)

  const totalMesos = mergedData.reduce((total, { mesos }) => total + mesos, 0)
  const totalCount = mergedData.reduce((total, { count }) => total + count, 0)
  return {
    tableData: map(evolve({ mesos: numberFormat }), mergedData),
    totalCount,
    totalMesos: numberFormat(totalMesos),
  }
}

const OptimalTable = ({ t }) => {
  const { tableData, totalCount, totalMesos } = useTableData(t)
  return (
    <Table
      columns={columns.map(evolve({ title: t }))}
      dataSource={tableData}
      pagination={false}
      rowKey="name"
      title={() => t('optimal_result')}
      summary={() => (
        <Table.Summary.Row>
          <Table.Summary.Cell>{t('total')}</Table.Summary.Cell>
          <Table.Summary.Cell>
            <div style={{ textAlign: 'center' }}>{totalCount}</div>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <div style={{ textAlign: 'right' }}>{totalMesos}</div>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      )}
      bordered
    />
  )
}

OptimalTable.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(OptimalTable)
