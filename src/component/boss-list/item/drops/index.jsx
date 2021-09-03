import { memo } from 'react'

/* components */
import { Space } from 'antd'

/* store */
import { useStore, useStroeSelector } from '@store'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, prop, path, propEq, defaultTo } from 'ramda'

/* mapping */
import { BossObject } from '@mapping/boss'

const matchStorageData = (id) => find(propEq('id', id))
const findDifficulty = (id, region, difficulty) =>
  pipe(
    path([region, id, 'difficulties']),
    defaultTo([]),
    find(propEq('difficulty', difficulty))
  )(BossObject)

const imgStyle = {
  height: 16,
}

const BossItemDrops = ({ id, t }) => {
  const [region] = useStore('meta.region')
  const difficulty = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), defaultTo({}), prop('difficulty'))
  )
  const drops = findDifficulty(id, region, difficulty)?.drops || []

  return drops && drops.length ? (
    <Space style={{ marginLeft: 4 }}>
      {drops.map((item) => {
        const itemIsObj = typeof item === 'object'
        const name = itemIsObj ? item.name : item
        return <img src={`/drops/${name}.png`} alt={name} style={imgStyle} />
      })}
    </Space>
  ) : null
}

export default withTranslation('index')(memo(BossItemDrops))
