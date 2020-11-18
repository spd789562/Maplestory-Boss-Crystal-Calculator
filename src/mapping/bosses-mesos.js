import BossMapping from './bosses-crystal'

export default BossMapping.reduce((bosses, boss) => {
  if (!bosses[boss.name]) {
    bosses[boss.name] = {}
  }
  boss.difficulties.forEach(
    ({ difficulty, mesos }) => (bosses[boss.name][difficulty] = mesos)
  )
}, {})
