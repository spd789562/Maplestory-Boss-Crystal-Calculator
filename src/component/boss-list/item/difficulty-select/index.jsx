import { memo } from 'react'

/* store */
import { useStroeSelector, useDispatch } from '@store'
import { UPDATE_BOSS_DATA } from '@store/boss'

/* components */
import { Space, Select } from 'antd'
import { DashboardOutlined } from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, prop, propEq } from 'ramda'

const matchStorageData = (id) => find(propEq('id', id))
const preventClick = (e) => e.stopPropagation()

const DifficultySelect = ({ id, difficulties, t }) => {
  const dispatch = useDispatch()
  const difficulty = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), prop('difficulty'))
  )
  const handleChange = (value) => {
    dispatch({
      type: UPDATE_BOSS_DATA,
      payload: {
        id,
        data: {
          difficulty: value,
        },
      },
    })
  }
  return (
    <Space onClick={preventClick}>
      <DashboardOutlined />
      <Select defaultValue={difficulty} onChange={handleChange}>
        {difficulties.map(({ difficulty: bossDifficulty }) => (
          <Select.Option key={`${id}-${bossDifficulty}`} value={bossDifficulty}>
            {t(bossDifficulty).trim()}
          </Select.Option>
        ))}
      </Select>
    </Space>
  )
}

DifficultySelect.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(DifficultySelect))
