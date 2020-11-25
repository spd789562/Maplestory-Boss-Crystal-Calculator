import { useCallback, useEffect } from 'react'

/* store */
import { useStore } from '@store'
import { CHANGE_BOSS_OPTIONS } from '@store/meta'

/* components */
import { Popover, Checkbox } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { evolve } from 'ramda'

const options = ['difficulty', 'partyCount', 'defeatTime']

const Options = ({ t, bossOptions, handleChange }) => {
  return (
    <Checkbox.Group defaultValue={bossOptions} onChange={handleChange}>
      {options
        .map((value) => ({ value, label: value }))
        .map(evolve({ label: t }))
        .map(({ label, value }) => (
          <div key={`random-${value}`}>
            <Checkbox value={value}>{label}</Checkbox>
          </div>
        ))}
    </Checkbox.Group>
  )
}

const OptionSelect = ({ t }) => {
  const [bossOptions, dispatch] = useStore('meta.bossOptions')
  const handleChange = useCallback((value) => {
    dispatch({ type: CHANGE_BOSS_OPTIONS, payload: value })
  }, [])
  useEffect(() => {
    if (process.browser) {
      const bossOptions = localStorage.getItem('bossOptions')
      bossOptions !== null && handleChange(bossOptions.split(','))
    }
  }, [])
  return (
    <Popover
      trigger="hover"
      placement="bottomRight"
      title={t('display_options')}
      arrowPointAtCenter
      content={
        <Options t={t} bossOptions={bossOptions} handleChange={handleChange} />
      }
    >
      <MoreOutlined style={{ color: '#666', fontSize: 20 }} />
    </Popover>
  )
}

OptionSelect.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(OptionSelect)
