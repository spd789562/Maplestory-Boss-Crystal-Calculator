/* components */
import { List, Card, Space } from 'antd'
import Item from './item'

/* components */
import OptionSelect from './option-select'

/* i18n */
import { withTranslation } from '@i18n'

/* mapping */
import BossesMapping from '@mapping/bosses-crystal'

const BossList = ({ t }) => {
  return (
    <List
      style={{ backgroundColor: '#fff' }}
      bordered
      dataSource={BossesMapping}
      header={
        <div style={{ display: 'flex' }}>
          {t('defeatable')}
          <Space style={{ marginLeft: 'auto' }}>
            <OptionSelect />
          </Space>
        </div>
      }
      renderItem={(item) => <Item {...item} />}
    />
  )
}

BossList.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(BossList)
