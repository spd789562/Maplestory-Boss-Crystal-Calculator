import { memo } from 'react'

/* store */
import { useStroeSelector } from '@store'

/* utils */
import { find, pipe, prop, propEq } from 'ramda'

const matchStorageData = (id) => find(propEq('id', id))

const BossName = ({ id, name, difficulties, withoutDifficulty }) => {
  const difficulty = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), prop('difficulty'))
  )

  return <span>{withoutDifficulty ? name : `${difficulty}_${name}`}</span>
}

export default memo(BossName)
