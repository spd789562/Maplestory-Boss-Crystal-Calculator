import { memo } from 'react'

/* store */
import { useStore, useStroeSelector, useDispatch } from '@store'
import { TOGGLE_BOSS_DEEATABLE } from '@store/boss'

/* components */
import { List, Avatar, Badge, Select, Space, InputNumber } from 'antd'
import {
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  DashboardOutlined,
  UsergroupAddOutlined,
  CheckOutlined,
} from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, prop, propEq } from 'ramda'

const matchStorageData = (id) => find(propEq('id', id))

const BossItem = ({ id, name, difficulties, withoutDifficulty }) => {
  const dispatch = useDispatch()
  const { defeatable, difficulty, partyCount, defeatTime } = useStroeSelector(
    'boss',
    matchStorageData(id)
  )
  const handleToggleDefeatable = () => () => {
    dispatch({ type: TOGGLE_BOSS_DEEATABLE, payload: id })
  }
  const hasDifficultySelect = difficulties.length > 1
  const actions = []
  hasDifficultySelect &&
    actions.push(
      <Space>
        <DashboardOutlined />
        <Select defaultValue={difficulty}>
          {difficulties.map(({ difficulty: bossDifficulty }) => (
            <Select.Option
              key={`${id}-${bossDifficulty}`}
              value={bossDifficulty}
            >
              {bossDifficulty}
            </Select.Option>
          ))}
        </Select>
      </Space>
    )
  return (
    <List.Item
      actions={[
        ...actions,
        <Space>
          <UsergroupAddOutlined />
          <InputNumber
            min={1}
            max={6}
            precision={0}
            style={{ width: 52 }}
            defaultValue={partyCount}
          />
        </Space>,
        <Space>
          <CheckOutlined />
          <InputNumber style={{ width: 60 }} defaultValue={defeatTime} />
        </Space>,
      ]}
    >
      <List.Item.Meta
        avatar={
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
              className={`boss-avator boss-avator__${
                defeatable ? 'defeatable' : 'undefeatable'
              }`}
              onClick={handleToggleDefeatable(id)}
            >
              <Avatar shape="square" src={`/boss/${name}.png`} />
            </div>
          </Badge>
        }
        title={
          withoutDifficulty ? name : `${difficulties[0].difficulty}_${name}`
        }
      />

      <style jsx global>{`
        .boss-avator img {
          width: 110%;
          transform: translateX(-2px);
        }
        .boss-avator {
          border-radius: 6px;
          border-style: solid;
          border-width: 2px;
          cursor: pointer;
          overflow: hidden;
        }
        .boss-avator__defeatable {
          border-color: #52c41a;
        }
        .boss-avator__undefeatable {
          border-color: #f5222d;
        }
      `}</style>
    </List.Item>
  )
}

BossItem.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(BossItem))
