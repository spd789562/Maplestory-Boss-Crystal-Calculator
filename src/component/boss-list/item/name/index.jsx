import { memo } from 'react'

/* store */
import { useStroeSelector } from '@store'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, prop, propEq } from 'ramda'

const matchStorageData = (id) => find(propEq('id', id))

const BossName = ({ id, name, difficulties, withoutDifficulty, t }) => {
  const difficulty = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), prop('difficulty'))
  )

  return (
    <span>{withoutDifficulty ? t(name) : `${t(difficulty)}${t(name)}`}</span>
  )
}

export default withTranslation('index')(memo(BossName))
