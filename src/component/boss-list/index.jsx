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
import { assoc, map, pipe, prop, includes } from 'ramda'
import getBossSuggestion from '@utils/get-boss-suggestion'

/* mapping */
import BossesMapping from '@mapping/bosses-crystal'

const BossList = ({ t }) => {
  const suggestions = useStroeSelector(
    'boss',
    pipe(getBossSuggestion, map(prop('id')))
  )
  return (
    <List
      style={{ backgroundColor: '#fff' }}
      bordered
      dataSource={BossesMapping.map((boss) =>
        assoc('recommand', includes(boss.id, suggestions), boss)
      )}
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
