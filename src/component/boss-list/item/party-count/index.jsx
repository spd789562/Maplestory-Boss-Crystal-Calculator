import { memo } from 'react'

/* store */
import { useStroeSelector, useDispatch } from '@store'
import { UPDATE_BOSS_DATA } from '@store/boss'

/* components */
import { Space, InputNumber } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, prop, propEq,defaultTo } from 'ramda'

const matchStorageData = (id) => find(propEq('id', id))

const preventClick = (e) => e.stopPropagation()

const MAX_PARTY_COUNT = 6

const PartyCount = ({ id }) => {
  const dispatch = useDispatch()
  const partyCount = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), defaultTo({}), prop('partyCount'))
  )
  const handleChange = (value) => {
    if (value >= 1 && value <= MAX_PARTY_COUNT) {
      dispatch({
        type: UPDATE_BOSS_DATA,
        payload: {
          id,
          data: {
            partyCount: value,
          },
        },
      })
    }
  }
  return (
    <Space onClick={preventClick}>
      <UsergroupAddOutlined />
      <InputNumber
        min={1}
        max={MAX_PARTY_COUNT}
        precision={0}
        style={{ width: 52 }}
        value={partyCount}
        onChange={handleChange}
      />
    </Space>
  )
}

PartyCount.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(PartyCount))
