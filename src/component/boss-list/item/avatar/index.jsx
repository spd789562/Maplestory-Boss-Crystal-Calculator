import { Fragment, memo } from 'react'

/* store */
import { useStroeSelector, useDispatch } from '@store'
import { TOGGLE_BOSS_DEFEATABLE } from '@store/boss'

/* components */
import { Avatar, Badge, Tooltip } from 'antd'
import {
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  StarFilled,
} from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, prop, propEq, defaultTo } from 'ramda'

const matchStorageData = (id) => find(propEq('id', id))

const preventClick = (e) => e.stopPropagation()

const BossAvatar = ({ id, name, recommend, t }) => {
  const dispatch = useDispatch()
  const defeatable = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), defaultTo({}), prop('defeatable'))
  )
  const handleToggleDefeatable = () => (e) => {
    e.stopPropagation()
    dispatch({ type: TOGGLE_BOSS_DEFEATABLE, payload: id })
  }
  return (
    <Fragment>
      <Badge
        count={
          recommend ? (
            <Tooltip title={t('recommend')} placement="topLeft">
              <StarFilled
                style={{ fontSize: 18, color: '#ffdb21', right: '52px' }}
              />
            </Tooltip>
          ) : (
            0
          )
        }
        onClick={preventClick}
      >
        <Badge
          count={
            defeatable ? (
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: 18 }}
              />
            ) : (
              <CloseCircleTwoTone
                twoToneColor="#f5222d"
                style={{ fontSize: 18 }}
              />
            )
          }
        >
          <div
            className={`boss-avatar boss-avatar__${
              defeatable ? 'defeatable' : 'undefeatable'
            }`}
            onClick={handleToggleDefeatable(id)}
          >
            <Avatar
              shape="square"
              alt={name}
              src={`/boss/${name}.png`}
              size={48}
            />
          </div>
        </Badge>
      </Badge>

      <style jsx global>{`
        .boss-avatar img {
          width: 110%;
          transform: translateX(-2px);
        }
        .boss-avatar {
          border-radius: 6px;
          border-style: solid;
          border-width: 3px;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.3s ease;
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
