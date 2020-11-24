/* store */
import { useStore } from '@store'
import { UPDATE_BOSS_DATA } from '@store/boss'

/* components */
import { Table, Avatar, Space } from 'antd'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { assoc, evolve, map, indexBy, prop } from 'ramda'
import numberFormat from '@utils/number-format'
import getBossSuggestion from '@utils/get-boss-suggestion'

/* mapping */
import BossMapping, { BossObject } from '@mapping/bosses-crystal'
import MesosMapping from '@mapping/bosses-mesos'

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    render: (name, { avatar }) => (
      <Space>
        <Avatar shape="square" alt={name} src={`/boss/${avatar}.png`} />
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

const useTableData = (t) => {
  const [bossData] = useStore('boss')
  const mergedData = getBossSuggestion(bossData).map((boss) =>
    assoc(
      'name',
      `${boss.difficulty ? t(boss.difficulty) : ''}${t(boss.name)}`,
      boss
    )
  )

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
      scroll={{ x: true }}
    />
  )
}

OptimalTable.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(OptimalTable)
