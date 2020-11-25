import { memo, useCallback } from 'react'

/* store */
import { useStore, useStroeSelector } from '@store'
import { SET_BOSS_DEFEATED } from '@store/boss'

/* components */
import { List, Space } from 'antd'
import Name from './name'
import Mesos from './mesos'
import Avatar from './avatar'
import DefeatTime from './defeat-time'
import PartyCount from './party-count'
import DifficultySelect from './difficulty-select'
import Defeated from './defeated'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { equals, find, propEq, prop, pipe, pick } from 'ramda'

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
  recommand,
}) => {
  const [{ bossOptions, filterOption, advanced }, dispatch] = useStore('meta')
  const { defeatDate, defeatable } = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), pick(['defeatDate', 'defeatable']))
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
  hasOptions('partyCount') &&
    actions.push(<PartyCount id={id} key={`${id}-party`} />)
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
    (filterOption === 'recommand' && recommand) ||
    (filterOption === 'defeatable' && defeatable)

  return canDisplay ? (
    <List.Item
      extra={<Space className="extra-item">{actions}</Space>}
      className="boss-list-item"
      onClick={handleDefeat}
    >
      <List.Item.Meta
        avatar={<Avatar id={id} name={name} recommand={recommand} />}
        title={
          <Name
            id={id}
            name={name}
            difficulties={difficulties}
            withoutDifficulty={withoutDifficulty}
          />
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
        .extra-item {
          width: unset;
        }
        @media screen and (max-width: 510px) {
          .extra-item {
            width: 100%;
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
