/* store */
import { useStroeSelector, useDispatch } from '@store'
import { SET_ALL_BOSS_DEFEATABLE } from '@store/boss'

/* components */
import { Checkbox } from 'antd'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { identity, map, pipe, prop } from 'ramda'

const SelectAll = ({ t }) => {
  const dispatch = useDispatch()
  const isAllDefeatable = useStroeSelector(
    'boss',
    pipe(map(prop('defeatable')), (defeatables) => {
      const length = defeatables.length || 0
      const defeatableCount = defeatables.filter(identity).length
      return length === 0 ? 0 : length === defeatableCount ? 1 : -1
    })
  )
  const handleCheck = ({ target: { checked } }) => {
    dispatch({ type: SET_ALL_BOSS_DEFEATABLE, payload: checked })
  }
  return (
    <Checkbox
      onChange={handleCheck}
      indeterminate={isAllDefeatable === -1}
      checked={isAllDefeatable === 1}
    >
      {t('defeatable')}
    </Checkbox>
  )
}

SelectAll.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(SelectAll)
