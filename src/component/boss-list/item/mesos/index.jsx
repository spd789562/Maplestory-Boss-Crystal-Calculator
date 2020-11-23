import { memo } from 'react'

/* store */
import { useStroeSelector } from '@store'

/* utils */
import { find, pipe, pick, propEq } from 'ramda'
import numberFormat from '@utils/number-format'

/* mapping */
import BossMesosMapping from '@mapping/bosses-mesos'

const matchStorageData = (id) => find(propEq('id', id))

const BossMesos = ({ id, name }) => {
  const { difficulty, partyCount } = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), pick(['difficulty', 'partyCount']))
  )
  const mesos = numberFormat(
    Math.floor((BossMesosMapping[name][difficulty] || 0) / (+partyCount || 0))
  )

  return <span>{mesos}</span>
}

export default memo(BossMesos)
