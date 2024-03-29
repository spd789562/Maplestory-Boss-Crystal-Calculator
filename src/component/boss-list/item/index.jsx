import { memo, useCallback } from 'react'

/* store */
import { useStore, useStroeSelector } from '@store'
import { SET_BOSS_DEFEATED } from '@store/boss'

/* components */
import { List, Space } from 'antd'
import Name from './name'
import Drops from './drops'
import Mesos from './mesos'
import Avatar from './avatar'
import DefeatTime from './defeat-time'
import CharacterCount from './character-count'
import DifficultySelect from './difficulty-select'
import Defeated from './defeated'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { equals, find, propEq, prop, pipe, pickAll, defaultTo } from 'ramda'

const _hasOptions = (options) => (value) => find(equals(value), options)
const matchStorageData = (id) => find(propEq('id', id))

const BossItem = ({
  id,
  name,
  difficulties,
  withoutDifficulty,
  defeatType,
  defeatTime,
  enterShareId,
  recommend,
}) => {
  const [{ bossOptions, filterOption, advanced }, dispatch] = useStore('meta')
  const { defeatDate, defeatable } = useStroeSelector(
    'boss',
    pipe(
      matchStorageData(id),
      defaultTo({}),
      pickAll(['defeatDate', 'defeatable'])
    )
  )
  const hasDifficultySelect = difficulties.length > 1
  const actions = []
  const hasOptions = useCallback(_hasOptions(bossOptions), [bossOptions])
  hasDifficultySelect &&
    hasOptions('difficulty') &&
    actions.push(
      <DifficultySelect
        id={id}
        difficulties={difficulties}
        key={`${id}-difficulty`}
      />
    )
  hasOptions('characterCount') &&
    actions.push(<CharacterCount id={id} key={`${id}-characters`} />)
  hasOptions('defeatTime') &&
    actions.push(
      <DefeatTime
        id={id}
        defeatType={defeatType}
        defeatTime={defeatTime}
        enterShareId={enterShareId}
        key={`${id}-defeat`}
      />
    )

  const handleDefeat = () => {
    if (!defeatDate && advanced) {
      dispatch({ type: SET_BOSS_DEFEATED, payload: id })
    }
  }
  const canDisplay =
    filterOption === 'all' ||
    (filterOption === 'recommend' && recommend) ||
    (filterOption === 'defeatable' && defeatable)

  return canDisplay ? (
    <List.Item
      extra={<Space className="extra-item">{actions}</Space>}
      className="boss-list-item"
      onClick={handleDefeat}
    >
      <List.Item.Meta
        avatar={<Avatar id={id} name={name} recommend={recommend} />}
        title={
          <>
            <Name
              id={id}
              name={name}
              difficulties={difficulties}
              withoutDifficulty={withoutDifficulty}
            />
            {hasOptions('drops') && <Drops id={id} />}
          </>
        }
        description={<Mesos id={id} name={name} difficulties={difficulties} />}
      />
      {advanced && (
        <Defeated
          id={id}
          defeatType={defeatType}
          defeatTime={defeatTime}
          enterShareId={enterShareId}
        />
      )}
      <style jsx global>{`
        .boss-list-item {
          position: relative;
          cursor: ${advanced ? 'pointer' : 'default'};
        }
        .boss-list-item:hover {
          background-color: #f7f7f7;
        }
        @media screen and (max-width: ${270 + actions.length * 90}px) {
          .extra-item {
            width: 100%;
            margin-top: 8px;
          }
        }
      `}</style>
    </List.Item>
  ) : null
}

BossItem.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(BossItem))
