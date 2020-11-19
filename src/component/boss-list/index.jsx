import { Fragment } from 'react'

/* store */
import { useStore } from '@store'
import { TOGGLE_BOSS_DEEATABLE } from '@store/boss'

/* components */
import { List, Card } from 'antd'
import Item from './item'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, propEq } from 'ramda'

/* mapping */
import BossesMapping from '@mapping/bosses-crystal'

const BossList = () => {
  return (
    <Card title="boss_list">
      <List
        style={{ backgroundColor: '#fff' }}
        bordered
        dataSource={BossesMapping}
        renderItem={(item) => <Item {...item} />}
      />
    </Card>
  )
}

BossList.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(BossList)
