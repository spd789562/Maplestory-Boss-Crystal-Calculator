/* store */
import { useStroeSelector, useStore } from '@store'

/* components */
import { List, Checkbox, Space } from 'antd'
import Item from './item'
import SelectAll from './select-all'
import OptionSelect from './option-select'
import FilterSelect from './filter-select'
import Link from 'next/link'

/* hooks */
import { Fragment, useMemo } from 'react'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { assoc, map, pipe, prop, includes, pick, __ } from 'ramda'
import getBossSuggestion from '@utils/get-boss-suggestion'

/* mapping */
import BossesMapping from '@mapping/boss'

const BossList = ({ t }) => {
  const { region, remainDays } = useStroeSelector(
    'meta',
    pick(['region', 'remainDays'])
  )
  const [boss] = useStore('boss')

  const suggestions = getBossSuggestion(boss, region, remainDays).map(
    prop('id')
  )
  return (
    <List
      style={{ backgroundColor: '#fff' }}
      bordered
      dataSource={BossesMapping[region].map((boss) =>
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
            <br />
            <Link href="/table">{t('boss_list_to_table')}</Link>
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
