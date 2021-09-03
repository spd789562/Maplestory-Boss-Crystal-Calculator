import TWMS from './twms'
import GMS from './gms'

import { indexBy, prop } from 'ramda'

const BossMapping = {
  TWMS,
  GMS,
}

export const BossObject = {
  TWMS: indexBy(prop('id'), TWMS),
  GMS: indexBy(prop('id'), GMS),
}

export default BossMapping
