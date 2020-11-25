import { Fragment, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
/* store */
import { useStore } from '@store'
import { UPDATE_BOSS_DATA } from '@store/boss'

/* components */
import { Table, Avatar, Space, Card, Row } from 'antd'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { assoc, evolve, map, indexBy, prop } from 'ramda'
import numberFormat from '@utils/number-format'
import getBossSuggestion from '@utils/get-boss-suggestion'

/* mapping */
import BossMapping, { BossObject } from '@mapping/bosses-crystal'
import MesosMapping from '@mapping/bosses-mesos'

const Pie = dynamic(() => import('@ant-design/charts/lib/pie'), {
  ssr: false,
})

const tabList = [
  { key: 'table', tab: 'table' },
  { key: 'chart', tab: 'chart' },
]

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
    tableData: mergedData,
    totalCount,
    totalMesos: numberFormat(totalMesos),
  }
}

const Chart = ({ config }) => (
  <div>{config.data.length && <Pie {...config} />}</div>
)

const OptimalTable = ({ t }) => {
  const [tab, hangeChangeTab] = useState('table')
  const { tableData, totalCount, totalMesos } = useTableData(t)

  const config = {
    data: tableData,
    angleField: 'mesos',
    colorField: 'name',
    appendPadding: 10,
    radius: 1,
    innerRadius: 0.6,
    legend: false,
    label: {
      type: 'inner',
      content: '{name}',
      position: 'middle',
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: '#333',
      },
    },
    pieStyle: {
      lineWidth: 0,
      lineDash: [0, 0],
    },
    state: {
      active: {
        style: {
          lineWidth: 0,
          fillOpacity: 0.65,
        },
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'unset',
          textOverflow: 'ellipsis',
          fontSize: 18,
        },
        formatter: function formatter(args) {
          return `<div style="display:flex;align-items:center;flex-direction:column;${
            args ? 'transform:translateY(-50%)' : ''
          }">
            <img height="48px" src="${
              args ? `/boss/${args.avatar}` : 'crystal'
            }.png" alt=${args ? args.name : 'crystal'} />
            <div>${args ? args.name : t('total')}</div>
            <div>${t('count')}: ${args ? args.count : totalCount}</div>
            <div>${t('mesos')}: ${numberFormat(
            args ? args.mesos : totalMesos
          )}</div>
          </div>`
        },
      },
    },
    height: 500,
    interactions: [
      { type: 'element-active' },
      { type: 'pie-statistic-active' },
    ],
  }

  return (
    <Card
      title={t('optimal_result')}
      bodyStyle={{ padding: 0 }}
      tabList={tabList}
      activeTabKey={tab}
      onTabChange={hangeChangeTab}
    >
      {tab === 'table' ? (
        <Table
          columns={columns.map(evolve({ title: t }))}
          dataSource={map(evolve({ mesos: numberFormat }), tableData)}
          pagination={false}
          rowKey="name"
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
      ) : (
        <Chart config={config} />
      )}
    </Card>
  )
}

OptimalTable.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(OptimalTable)
