import { memo } from 'react'

/* components */
import { List } from 'antd'
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
    >
      <List.Item.Meta
        avatar={<Avatar id={id} name={name} />}
        title={
          withoutDifficulty ? name : `${difficulties[0].difficulty}_${name}`
        }
      />
    </List.Item>
  )
}

BossItem.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(BossItem))
