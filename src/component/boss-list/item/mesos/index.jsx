import { memo } from 'react'

/* store */
import { useStroeSelector } from '@store'

/* utils */
import { find, pipe, prop, propEq } from 'ramda'
import numberFormat from '@utils/number-format'

/* mapping */
import BossMesosMapping from '@mapping/bosses-mesos'

const matchStorageData = (id) => find(propEq('id', id))

const BossMesos = ({ id, name, difficulties }) => {
  const difficulty = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), prop('difficulty'))
  )
  const mesos = numberFormat(BossMesosMapping[name][difficulty] || 0)

  return <span>{mesos}</span>
}

export default memo(BossMesos)
