import { memo, Fragment } from 'react'

/* store */
import { useStore, useStroeSelector, useDispatch } from '@store'
import { CANCEL_BOSS_DEFEATED } from '@store/boss'

/* components */
import { CloseCircleOutlined } from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, map, pipe, pick, propEq } from 'ramda'
import moment from 'moment'

/* mapping */
import BossMapping from '@mapping/boss'

const FORMAT = 'YYYY-MM-DD HH:mm'

const matchStorageData = (id) => find(propEq('id', id))
const findBossMapping = (id, region='GMS') => matchStorageData(id)(BossMapping[region])
const defineMaxTime = (type, time) => (type === 'day' ? 7 : 1) * time
const preventClick = (e) => e.stopPropagation()

const BossDefeated = ({
  id,
  defeatType = 'day',
  defeatTime: defeatTypeTime = 1,
  enterShareId,
  t,
}) => {
  const dispatch = useDispatch()
  let hasConsumEnter = false
  const [region] = useStore('meta.region')
  const [{ defeatTime, defeatDate }, sharedBoss] = useStroeSelector(
    'boss',
    pipe(
      (bosses) => [
        matchStorageData(id)(bosses),
        ...(enterShareId ? [matchStorageData(enterShareId)(bosses)] : []),
      ],
      map(pick(['id', 'defeatTime', 'defeatDate']))
    )
  )
  let maxTime = defineMaxTime(defeatType, defeatTypeTime)
  if (sharedBoss) {
    // check defeate date is same
    if (
      sharedBoss.defeatDate &&
      moment(sharedBoss.defeatDate).isSame(moment(), 'day')
    ) {
      hasConsumEnter = true
    }
    // check max time
    const sharedBossData = findBossMapping(sharedBoss.id, region)
    const sharedBossMaxTime = defineMaxTime(
      sharedBossData.defeatType,
      sharedBossData.defeatTime
    )
    const bigMaxTime = Math.max(maxTime, sharedBossMaxTime)
    const withoutSelfRemainTime = bigMaxTime - sharedBoss.defeatTime
    maxTime = Math.min(maxTime, withoutSelfRemainTime)
  }
  const outOfTime =
    sharedBoss &&
    defeatTime >= maxTime &&
    defeatTime < defineMaxTime(defeatType, defeatTypeTime)
  const date = moment(defeatDate).format(FORMAT)
  const handleClearDefeated = () => {
    dispatch({ type: CANCEL_BOSS_DEFEATED, payload: id })
  }

  return (
    <Fragment>
      {!!defeatDate && (
        <div className="boss-defeated" onClick={preventClick}>
          {t('defeated_on')}
          <div className="boss-defeated-date">{date}</div>
          <CloseCircleOutlined
            style={{ marginLeft: 'auto', fontSize: 28 }}
            onClick={handleClearDefeated}
          />
        </div>
      )}
      {!!hasConsumEnter && (
        <div className="boss-defeated" onClick={preventClick}>
          {t('today_was_entered')}
        </div>
      )}
      {!hasConsumEnter && !!outOfTime && (
        <div className="boss-defeated" onClick={preventClick}>
          {t('is_out_of_times')}
        </div>
      )}
      <style jsx>{`
        .boss-defeated {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 1;
          display: flex;
          align-items: center;
          color: #fff;
          padding-left: 16px;
          padding-right: 16px;
          font-size: 20px;
          cursor: default;
        }
        .boss-defeated-date {
          color: #ffff7c;
          margin-left: 8px;
        }
      `}</style>
    </Fragment>
  )
}

BossDefeated.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(BossDefeated))
