import { Fragment, memo } from 'react'

/* store */
import { useStroeSelector, useDispatch } from '@store'
import { TOGGLE_BOSS_DEFEATABLE } from '@store/boss'

/* components */
import { Avatar, Badge } from 'antd'
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, prop, propEq } from 'ramda'

const matchStorageData = (id) => find(propEq('id', id))

const BossAvatar = ({ id, name }) => {
  const dispatch = useDispatch()
  const defeatable = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), prop('defeatable'))
  )
  const handleToggleDefeatable = () => () => {
    dispatch({ type: TOGGLE_BOSS_DEFEATABLE, payload: id })
  }
  return (
    <Fragment>
      <Badge
        count={
          defeatable ? (
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          ) : (
            <CloseCircleTwoTone twoToneColor="#f5222d" />
          )
        }
      >
        <div
          className={`boss-avatar boss-avatar__${
            defeatable ? 'defeatable' : 'undefeatable'
          }`}
          onClick={handleToggleDefeatable(id)}
        >
          <Avatar shape="square" src={`/boss/${name}.png`} />
        </div>
      </Badge>

      <style jsx global>{`
        .boss-avatar img {
          width: 110%;
          transform: translateX(-2px);
        }
        .boss-avatar {
          border-radius: 6px;
          border-style: solid;
          border-width: 2px;
          cursor: pointer;
          overflow: hidden;
        }
        .boss-avatar__defeatable {
          border-color: #52c41a;
        }
        .boss-avatar__undefeatable {
          border-color: #f5222d;
        }
      `}</style>
    </Fragment>
  )
}

BossAvatar.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(BossAvatar))
