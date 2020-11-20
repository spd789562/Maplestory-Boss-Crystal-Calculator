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
import { __, curry, find, pipe, prop, map, propEq, pick } from 'ramda'

/* mapping */
import BossMapping from '@mapping/bosses-crystal'

const matchStorageData = (id) => curry(find(propEq('id', id)))
const findBossMapping = (id) => matchStorageData(id)(BossMapping)
const defineMaxTime = (type, time) => (type === 'day' ? 7 : 1) * time
const preventClick = (e) => e.stopPropagation()

const DefeatTime = ({
  id,
  defeatType = 'day',
  defeatTime: defeatTypeTime = 1,
  enterShareId,
}) => {
  const dispatch = useDispatch()
  const [{ defeatTime, defeatable }, sharedBoss] = useStroeSelector(
    'boss',
    pipe(
      (bosses) => [
        matchStorageData(id)(bosses),
        ...(enterShareId ? [matchStorageData(enterShareId)(bosses)] : []),
      ],
      map(pick(['id', 'defeatTime', 'defeatable']))
    )
  )
  let maxTime = defineMaxTime(defeatType, defeatTypeTime)
  if (sharedBoss) {
    const sharedBossData = findBossMapping(sharedBoss.id)
    const sharedBossMaxTime = defineMaxTime(
      sharedBossData.defeatType,
      sharedBossData.defeatTime
    )
    const bigMaxTime = Math.max(maxTime, sharedBossMaxTime)
    const withoutSelfRemainTime = bigMaxTime - sharedBoss.defeatTime
    maxTime = Math.min(maxTime, withoutSelfRemainTime)
  }
  const handleChange = (value) => {
    if (value >= 0 && value <= maxTime) {
      // log defeatDate when reach maxTime
      const defeatDate = value === maxTime ? new Date().getTime() : 0
      dispatch({
        type: UPDATE_BOSS_DATA,
        payload: {
          id,
          data: {
            defeatTime: value,
            defeatDate,
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
        min={0}
        value={defeatTime}
        onChange={handleChange}
        disabled={!defeatable}
      />
    </Space>
  )
}

DefeatTime.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(DefeatTime))
