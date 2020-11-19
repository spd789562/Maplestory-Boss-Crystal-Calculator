import { memo } from 'react'

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

const BossItem = ({
  id,
  name,
  difficulties,
  withoutDifficulty,
  defeatType,
}) => {
  const hasDifficultySelect = difficulties.length > 1
  const actions = []
  hasDifficultySelect &&
    actions.push(<DifficultySelect id={id} difficulties={difficulties} />)
  return (
    <List.Item
      actions={[
        ...actions,
        <PartyCount id={id} />,
        <DefeatTime id={id} defeatType={defeatType} />,
      ]}
      className="boss-list-item"
    >
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
