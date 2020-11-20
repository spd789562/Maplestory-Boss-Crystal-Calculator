import { memo, useCallback } from 'react'

/* store */
import { useStore } from '@store'

/* components */
import { List } from 'antd'
import Name from './name'
import Mesos from './mesos'
import Avatar from './avatar'
import DefeatTime from './defeat-time'
import PartyCount from './party-count'
import DifficultySelect from './difficulty-select'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { equals, find } from 'ramda'

const _hasOptions = (options) => (value) => find(equals(value), options)

const BossItem = ({
  id,
  name,
  difficulties,
  withoutDifficulty,
  defeatType,
  defeatTime,
  enterShareId,
}) => {
  const [bossOptions] = useStore('meta.bossOptions')
  const hasDifficultySelect = difficulties.length > 1
  const actions = []
  const hasOptions = useCallback(_hasOptions(bossOptions), [bossOptions])
  hasDifficultySelect &&
    hasOptions('difficulty') &&
    actions.push(<DifficultySelect id={id} difficulties={difficulties} />)
  hasOptions('partyCount') && actions.push(<PartyCount id={id} />)
  hasOptions('defeatTime') &&
    actions.push(
      <DefeatTime
        id={id}
        defeatType={defeatType}
        defeatTime={defeatTime}
        enterShareId={enterShareId}
      />
    )

  return (
    <List.Item actions={actions} className="boss-list-item">
      <List.Item.Meta
        avatar={<Avatar id={id} name={name} />}
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
      <style jsx global>{`
        .boss-list-item:hover {
          background-color: #f7f7f7;
        }
      `}</style>
    </List.Item>
  )
}

BossItem.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(BossItem))
