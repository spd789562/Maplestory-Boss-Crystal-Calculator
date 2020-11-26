/* components */
import { Table, Avatar, Space } from 'antd'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { evolve, map } from 'ramda'
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
    title: 'mesos',
    dataIndex: 'mesos',
    align: 'right',
  },
]

const OptimalTable = ({ tableData, totalCount, totalMesos, t }) => {
  return (
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
  )
}

OptimalTable.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(OptimalTable)
