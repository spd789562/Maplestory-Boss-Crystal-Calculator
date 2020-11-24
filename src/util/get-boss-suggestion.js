/* utils */
import {
  ascend,
  assoc,
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
import MesosMapping from '@mapping/bosses-mesos'

const toObject = reduce((data, boss) => assoc(boss.id, boss, data), {})
const defineMaxTime = (type, time) => (type === 'day' ? 7 : 1) * time

const WEEK_MAX = 60

const getBossSuggestion = (bossData) => {
  const convertBossData = toObject(bossData)
  const currentDefeatTotal = reduce(
    (total, { defeatTime = 0 }) => total + defeatTime,
    0
  )(bossData)
  const remainCount = WEEK_MAX - currentDefeatTotal
  const mergedData = pipe(
    reduce((data, boss) => {
      const storeBossData = convertBossData[boss.id] || {}
      const bossMesos = Math.floor(
        MesosMapping[boss.name][storeBossData.difficulty] /
          (storeBossData.partyCount || 1)
      )
      if (storeBossData.defeatable) {
        let maxDefeatTime = defineMaxTime(boss.defeatType, boss.defeatTime)
        // has share enter time
        if (boss.enterShareId) {
          const sharedBoss = convertBossData[boss.enterShareId]
          const sharedBossData = BossObject[boss.enterShareId]
          const sharedBossMaxTime = defineMaxTime(
            sharedBossData.defeatType,
            sharedBossData.defeatTime
          )
          const bigMaxTime = Math.max(maxDefeatTime, sharedBossMaxTime)
          const withoutSelfRemainTime = bigMaxTime - sharedBoss.defeatTime
          maxDefeatTime = Math.min(maxDefeatTime, withoutSelfRemainTime)
          const sharedBossMesos = Math.floor(
            MesosMapping[boss.name][sharedBoss.difficulty] /
              (storeBossData.partyCount || 1)
          )
          // reduce when shared boss
          if (sharedBossMesos > bossMesos) {
            maxDefeatTime =
              maxDefeatTime + sharedBoss.defeatTime - sharedBossData.defeatTime
          }
        }
        let remainDefeatTime = maxDefeatTime - storeBossData.defeatTime

        remainDefeatTime &&
          times(() => {
            data.push({
              id: boss.id,
              avatar: boss.name,
              difficulty: boss.withoutDifficulty
                ? false
                : storeBossData.difficulty,
              name: boss.name,
              mesos: bossMesos,
            })
          }, remainDefeatTime)
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

export default getBossSuggestion
