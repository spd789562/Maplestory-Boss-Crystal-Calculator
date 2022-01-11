import { memo } from 'react'

/* store */
import { useStroeSelector, useDispatch } from '@store'
import { UPDATE_BOSS_DATA } from '@store/boss'

/* components */
import { Space, InputNumber, Tooltip } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, prop, propEq, defaultTo } from 'ramda'

const matchStorageData = (id) => find(propEq('id', id))

const preventClick = (e) => e.stopPropagation()

const MAX_CHARACTER_COUNT = 60

const CharacterCount = ({ id, t }) => {
  const dispatch = useDispatch()
  const characters = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), defaultTo({}), prop('characters'))
  )
  const handleChange = (value) => {
    if (value >= 1 && value <= MAX_CHARACTER_COUNT) {
      dispatch({
        type: UPDATE_BOSS_DATA,
        payload: {
          id,
          data: {
            characters: value,
          },
        },
      })
    }
  }
  return (
    <Tooltip title={t('characterCount')}>
      <Space onClick={preventClick}>
        <UsergroupAddOutlined />
        <InputNumber
          min={1}
          max={MAX_CHARACTER_COUNT}
          precision={0}
          style={{ width: 52 }}
          value={characters || 1}
          onChange={handleChange}
        />
      </Space>
    </Tooltip>
  )
}

CharacterCount.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(CharacterCount))
