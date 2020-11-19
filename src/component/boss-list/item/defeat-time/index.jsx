import { memo } from 'react'

/* store */
import { useStroeSelector, useDispatch } from '@store'
import { UPDATE_BOSS_DATA } from '@store/boss'

/* components */
import { Space, InputNumber } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, prop, propEq } from 'ramda'

const matchStorageData = (id) => find(propEq('id', id))
const preventClick = (e) => e.stopPropagation()

const DefeatTime = ({ id, defeatType = 'day' }) => {
  const dispatch = useDispatch()
  const defeatTime = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), prop('defeatTime'))
  )
  const maxTime = defeatType === 'day' ? 7 : 1
  const handleChange = (value) => {
    if (value >= 0 && value <= maxTime) {
      dispatch({
        type: UPDATE_BOSS_DATA,
        payload: {
          id,
          data: {
            defeatTime: value,
          },
        },
      })
    }
  }
  return (
    <Space onClick={preventClick}>
      <CheckOutlined />
      <InputNumber
        style={{ width: 60 }}
        precision={0}
        max={maxTime}
        defaultValue={defeatTime}
        onChange={handleChange}
      />
    </Space>
  )
}

DefeatTime.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(DefeatTime))
