import { useState } from 'react'
/* store */
import { useStore, useStroeSelector } from '@store'

/* components */
import { Card } from 'antd'
import Table from './table'
import Chart from './chart'
import CrusaderCoinTable from './crusader'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { assoc, evolve, multiply, pick } from 'ramda'
import numberFormat from '@utils/number-format'
import getBossSuggestion from '@utils/get-boss-suggestion'

const tabList = [
  { key: 'table', tab: 'table' },
  { key: 'chart', tab: 'chart' },
  { key: 'crusader', tab: 'crusader' },
]

const useTableData = (t) => {
  const [bossData] = useStore('boss')
  const { isReboot, region, remainDays } = useStroeSelector(
    'meta',
    pick(['isReboot', 'region', 'remainDays'])
  )
  const mergedData = getBossSuggestion(bossData, region, remainDays)
    .map((boss) =>
      assoc(
        'name',
        `${boss.difficulty ? t(boss.difficulty) : ''}${t(boss.name)}`,
        boss
      )
    )
    .map(evolve({ mesos: multiply(isReboot ? 3 : 1) }))

  const totalMesos = mergedData.reduce((total, { mesos }) => total + mesos, 0)
  const totalCount = mergedData.reduce((total, { count }) => total + count, 0)
  return {
    region,
    bossData,
    tableData: mergedData,
    totalCount,
    totalMesos: numberFormat(totalMesos),
  }
}

const OptimalTable = ({ t }) => {
  const [tab, hangeChangeTab] = useState('table')
  const { region, bossData, tableData, totalCount, totalMesos } =
    useTableData(t)
  return (
    <Card
      title={t('optimal_result')}
      bodyStyle={{ padding: 0 }}
      tabList={tabList
        .filter(({ key }) => !(key === 'crusader' && region !== 'TWMS'))
        .map(evolve({ tab: t }))}
      activeTabKey={tab}
      onTabChange={hangeChangeTab}
    >
      {tab === 'table' ? (
        <Table {...{ tableData, totalCount, totalMesos }} />
      ) : tab === 'chart' ? (
        <Chart {...{ tableData, totalCount, totalMesos }} />
      ) : (
        <CrusaderCoinTable {...{ bossData, tableData }} />
      )}
    </Card>
  )
}

OptimalTable.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(OptimalTable)
