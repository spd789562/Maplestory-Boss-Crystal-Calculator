/* utils */
import {
  ascend,
  assoc,
  curry,
  descend,
  evolve,
  map,
  pipe,
  prop,
  reduce,
  slice,
  sort,
  times,
  values,
} from 'ramda'

/* mapping */
import BossMapping, { BossObject } from '@mapping/bosses-crystal'
import MesosMapping from '@mapping/mesos'

const toObject = reduce((data, boss) => assoc(boss.id, boss, data), {})
const defineMaxTime = (type, time, max) => (type === 'day' ? max : 1) * time

const WEEK_MAX = 60

const getBossSuggestion = (bossData, region = 'GMS', maxTime = 7) => {
  const currentRegion = MesosMapping[region] ? region : 'GMS'
  const convertBossData = toObject(bossData)
  const currentDefeatTotal = reduce(
    (total, { defeatTime = 0 }) => total + defeatTime,
    0
  )(bossData)
  const remainCount = WEEK_MAX - currentDefeatTotal
  const mergedData = pipe(
    reduce((data, boss) => {
      const storeBossData = convertBossData[boss.id] || {}
      const currentBossAllMesos = MesosMapping[currentRegion][boss.name]
      const bossMesos = Math.floor(
        currentBossAllMesos[storeBossData.difficulty] /
          (storeBossData.partyCount || 1)
      )
      if (storeBossData.defeatable) {
        let maxDefeatTime = defineMaxTime(
          boss.defeatType,
          boss.defeatTime,
          maxTime
        )
        if (
          boss.enterShareId &&
          convertBossData[boss.enterShareId] &&
          convertBossData[boss.enterShareId].defeatable
        ) {
          const sharedBoss = convertBossData[boss.enterShareId]
          const sharedBossData = BossObject[boss.enterShareId]
          const sharedBossMaxTime = defineMaxTime(
            sharedBossData.defeatType,
            sharedBossData.defeatTime,
            maxTime
          )
          const bigMaxTime = Math.max(maxDefeatTime, sharedBossMaxTime)
          const withoutSelfRemainTime = bigMaxTime - sharedBoss.defeatTime
          maxDefeatTime = Math.min(maxDefeatTime, withoutSelfRemainTime)
          const sharedBossMesos = Math.floor(
            currentBossAllMesos[sharedBoss.difficulty] /
              (storeBossData.partyCount || 1)
          )
          // reduce when shared boss mesos grater then this
          if (sharedBossMesos > bossMesos) {
            maxDefeatTime =
              maxDefeatTime + sharedBoss.defeatTime - sharedBossData.defeatTime
          }
        }
        let remainDefeatTime = maxDefeatTime - storeBossData.defeatTime

        remainDefeatTime &&
          times(
            () => {
              data.push({
                id: boss.id,
                avatar: boss.name,
                difficulty: boss.withoutDifficulty
                  ? false
                  : storeBossData.difficulty,
                name: boss.name,
                mesos: bossMesos,
              })
            },
            remainDefeatTime < 0 ? 0 : remainDefeatTime
          )
      }
      return data
    }, []),
    // grab most mesos 60 ahead
    sort(descend(prop('mesos'))),
    slice(0, remainCount),
    // aggrate data
    reduce((data, boss) => {
      const { id, mesos } = boss
      if (!data[id]) {
        data[id] = { ...boss, count: 0, mesos: 0 }
      }
      data[id].count += 1
      data[id].mesos += mesos
      return data
    }, {}),
    values,
    sort(ascend(prop('mesos')))
  )(BossMapping)
  return mergedData
}

export default curry(getBossSuggestion)
