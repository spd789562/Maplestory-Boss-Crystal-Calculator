import { memo } from 'react'

/* store */
import { useStore, useStroeSelector } from '@store'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { find, pipe, pick, propEq, defaultTo, path } from 'ramda'
import numberFormat from '@utils/number-format'

/* mapping */
import { BossObject } from '@mapping/boss'
import MesosMapping from '@mapping/mesos'

const matchStorageData = (id) => find(propEq('id', id))

const BossMesos = ({ id, name, t }) => {
  const { difficulty } = useStroeSelector(
    'boss',
    pipe(matchStorageData(id), defaultTo({}), pick(['difficulty']))
  )
  const { isReboot, region } = useStroeSelector(
    'meta',
    pick(['isReboot', 'region'])
  )
  const currentRegion = MesosMapping[region] ? region : 'GMS'
  const storeMesos = useStroeSelector(
    'mesos',
    path([currentRegion, name, difficulty])
  )
  const defaultMesos = MesosMapping[currentRegion][name][difficulty]
  const { defeatType } = BossObject[currentRegion][id]
  const mesos = numberFormat(
    (storeMesos || defaultMesos || 0) * (isReboot ? 3 : 1)
  )

  return (
    <span>
      {mesos} / {t(`times_${defeatType}`)}
    </span>
  )
}

BossMesos.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(memo(BossMesos))
