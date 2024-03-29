import Boss from '../boss'

const { GMS, TWMS } = Boss

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

const MesosMapping = {
  TWMS: toMesosMapping(TWMS),
  GMS: toMesosMapping(GMS),
}

export default MesosMapping
