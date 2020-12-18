/* store */
import { useStroeSelector, useStore } from '@store'

/* components */
import { List, Checkbox, Space } from 'antd'
import Item from './item'
import SelectAll from './select-all'
import OptionSelect from './option-select'
import FilterSelect from './filter-select'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { assoc, map, pipe, prop, includes, __ } from 'ramda'
import getBossSuggestion from '@utils/get-boss-suggestion'

/* mapping */
import BossesMapping from '@mapping/bosses-crystal'

const BossList = ({ t }) => {
  const [region] = useStore('meta.region')

  const suggestions = useStroeSelector(
    'boss',
    pipe(getBossSuggestion(__, region), map(prop('id')))
  )
  return (
    <List
      style={{ backgroundColor: '#fff' }}
      bordered
      dataSource={BossesMapping.map((boss) =>
        assoc('recommend', includes(boss.id, suggestions), boss)
      )}
      header={
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <SelectAll />
          <Space style={{ marginLeft: 'auto' }}>
            <FilterSelect />
            <OptionSelect />
          </Space>
          <div style={{ color: '#666', fontSize: 14, width: '100%' }}>
            {t('boss_list_description')}
          </div>
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
