import { Fragment } from 'react'

/* store */
import { useStore } from '@store'
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
import { find, propEq } from 'ramda'

/* mapping */
import BossesMapping from '@mapping/bosses-crystal'

const matchStorageData = (id) => find(propEq('id', id))

const BossList = () => {
  const [boss, dispatch] = useStore('boss')
  const handleToggleDefeatable = (id) => () => {
    dispatch({ type: TOGGLE_BOSS_DEEATABLE, payload: id })
  }
  return (
    <Fragment>
      <List
        style={{ backgroundColor: '#fff' }}
        bordered
        dataSource={BossesMapping}
        renderItem={(item) => {
          const {
            defeatable,
            difficulty,
            partyCount,
            defeatTime,
          } = matchStorageData(item.id)(boss)
          const hasDifficultySelect = item.difficulties.length > 1
          const actions = []
          hasDifficultySelect &&
            actions.push(
              <Space>
                <DashboardOutlined />
                <Select defaultValue={difficulty}>
                  {item.difficulties.map(({ difficulty: bossDifficulty }) => (
                    <Select.Option
                      key={`${item.id}-${bossDifficulty}`}
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
                  <InputNumber
                    style={{ width: 60 }}
                    defaultValue={defeatTime}
                  />
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
                      onClick={handleToggleDefeatable(item.id)}
                    >
                      <Avatar shape="square" src={`/boss/${item.name}.png`} />
                    </div>
                  </Badge>
                }
                title={
                  item.withoutDifficulty
                    ? item.name
                    : `${item.difficulties[0].difficulty}_${item.name}`
                }
              />
            </List.Item>
          )
        }}
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
        }
        .boss-avator__defeatable {
          border-color: #52c41a;
        }
        .boss-avator__undefeatable {
          border-color: #f5222d;
        }
      `}</style>
    </Fragment>
  )
}

BossList.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(BossList)
