/* components */
import { Table, Avatar, Space } from 'antd'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { evolve, map, sum, prop, propEq } from 'ramda'
import numberFormat from '@utils/number-format'

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
    title: 'per_coin_count',
    dataIndex: 'crusaderCoinUnit',
    align: 'center',
  },
  {
    title: 'coin_total',
    dataIndex: 'crusaderCoin',
    align: 'center',
  },
]

const CrusaderCoinTable = ({ tableData, bossData, t }) => {
  const _bossData = bossData.filter(prop('defeatTime'))
  const _tableData = tableData
    .map((boss) => {
      const crusaderCoinUnit =
        (boss.drops.find(propEq('name', 'crusaders_coin')) || {}).value || 0
      const crusaderCoin = crusaderCoinUnit * boss.count
      return { ...boss, crusaderCoinUnit, crusaderCoin }
    })
    .filter(prop('crusaderCoin'))
  return (
    <>
      <div style={{ color: '#666', fontSize: 14, width: '100%', padding: 12 }}>
        {t('crusader_description')}
      </div>
      <Table
        columns={columns.map(evolve({ title: t }))}
        dataSource={_tableData}
        pagination={false}
        rowKey="name"
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell>{t('total')}</Table.Summary.Cell>
            <Table.Summary.Cell colSpan={3}>
              <div style={{ textAlign: 'center' }}>
                {sum(_tableData.map(prop('crusaderCoin')))}
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
        bordered
        scroll={{ x: true }}
      />
    </>
  )
}

CrusaderCoinTable.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(CrusaderCoinTable)
