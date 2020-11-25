import { useCallback, useEffect } from 'react'

/* store */
import { useStore } from '@store'
import { CHANGE_FILTER_OPTION } from '@store/meta'

/* components */
import { Popover, Radio } from 'antd'
import { FilterFilled } from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { evolve } from 'ramda'

const options = ['all', 'recommend', 'defeatable']

const Options = ({ t, filterOption, handleChange }) => {
  return (
    <Radio.Group
      defaultValue={filterOption}
      onChange={({ target: { value } }) => handleChange(value)}
    >
      {options
        .map((value) => ({ value, label: value }))
        .map(evolve({ label: t }))
        .map(({ label, value }) => (
          <div key={`random-${value}`}>
            <Radio value={value}>{label}</Radio>
          </div>
        ))}
    </Radio.Group>
  )
}

const FilterSelect = ({ t }) => {
  const [filterOption, dispatch] = useStore('meta.filterOption')
  const handleChange = useCallback((value) => {
    dispatch({ type: CHANGE_FILTER_OPTION, payload: value })
  }, [])
  useEffect(() => {
    if (process.browser) {
      const filterOption = localStorage.getItem('filterOption')
      filterOption !== null && handleChange(filterOption)
    }
  }, [])
  return (
    <Popover
      trigger="hover"
      placement="bottomRight"
      title={t('filter_option')}
      arrowPointAtCenter
      content={
        <Options
          t={t}
          filterOption={filterOption}
          handleChange={handleChange}
        />
      }
    >
      <FilterFilled style={{ color: '#666', fontSize: 20 }} />
    </Popover>
  )
}

FilterSelect.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(FilterSelect)
