import TWMS from './twms'
import GMS from './gms'

const toMesosMapping = (mapping) =>
  mapping.reduce((bosses, boss) => {
    if (!bosses[boss.name]) {
      bosses[boss.name] = {}
    }
    boss.difficulties.forEach(
      ({ difficulty, mesos }) => (bosses[boss.name][difficulty] = mesos)
    )
    return bosses
  }, {})

export default {
  TWMS: toMesosMapping(TWMS),
  GMS: toMesosMapping(GMS),
}
