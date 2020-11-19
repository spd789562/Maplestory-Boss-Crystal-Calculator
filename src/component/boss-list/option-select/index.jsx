import { useCallback } from 'react'

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

const Options = ({ t }) => {
  const [bossOptions, dispatch] = useStore('meta.bossOptions')
  const handleChange = useCallback((value) => {
    dispatch({ type: CHANGE_BOSS_OPTIONS, payload: value })
  })
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
  return (
    <Popover
      trigger="hover"
      placement="bottomRight"
      title={t('display_options')}
      arrowPointAtCenter
      content={<Options t={t} />}
    >
      <MoreOutlined />
    </Popover>
  )
}

OptionSelect.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(OptionSelect)
