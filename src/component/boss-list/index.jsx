/* store */
import { useStroeSelector, useDispatch } from '@store'

/* components */
import { List, Checkbox, Space } from 'antd'
import Item from './item'
import OptionSelect from './option-select'
import SelectAll from './select-all'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { identity, pipe, prop } from 'ramda'

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
          <SelectAll />
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
