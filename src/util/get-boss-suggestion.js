/* utils */
import {
  ascend,
  assoc,
  curry,
  descend,
  evolve,
  map,
  path,
  pipe,
  prop,
  propEq,
  reduce,
  slice,
  sort,
  times,
  values,
} from 'ramda'

/* mapping */
import BossMapping, { BossObject } from '@mapping/boss'
import MesosMapping from '@mapping/mesos'

const toObject = reduce((data, boss) => assoc(boss.id, boss, data), {})
const defineMaxTime = (type, time, max, characters = 1) =>
  (type === 'day' ? max : 1) * time * characters

const getBossSuggestion = ({
  bossData,
  mesosData,
  region = 'GMS',
  remainDays = 7,
  weekMax = 180,
}) => {
  const currentRegion = MesosMapping[region] ? region : 'GMS'
  const convertBossData = toObject(bossData)
  const currentDefeatTotal = reduce(
    (total, { defeatTime = 0 }) => total + defeatTime,
    0
  )(bossData)
  const remainCount = weekMax - currentDefeatTotal
  const mergedData = pipe(
    reduce((data, boss) => {
      const storeBossData = convertBossData[boss.id] || {}
      const currentBossAllDefaultMesos =
        path([currentRegion, boss.name])(MesosMapping) || {}
      const currentBossAllMesos =
        path([currentRegion, boss.name])(mesosData) || {}
      const currentBossMesos =
        currentBossAllMesos[storeBossData.difficulty] ||
        currentBossAllDefaultMesos[storeBossData.difficulty]
      const bossMesos = Math.floor(
        currentBossMesos / (storeBossData.partyCount || 1)
      )
      const bossDrops =
        (
          BossObject[currentRegion][boss.id].difficulties.find(
            propEq('difficulty', storeBossData.difficulty)
          ) || {}
        ).drops || []
      if (storeBossData.defeatable) {
        let maxDefeatTime = defineMaxTime(
          boss.defeatType,
          boss.defeatTime,
          remainDays,
          storeBossData.characters || 1
        )
        if (
          boss.enterShareId &&
          convertBossData[boss.enterShareId] &&
          convertBossData[boss.enterShareId].defeatable
        ) {
          const sharedBoss = convertBossData[boss.enterShareId]
          const sharedBossData = BossObject[currentRegion][boss.enterShareId]
          const sharedBossMaxTime = defineMaxTime(
            sharedBossData.defeatType,
            sharedBossData.defeatTime,
            remainDays,
            convertBossData.characters || 1
          )
          const bigMaxTime = Math.max(maxDefeatTime, sharedBossMaxTime)
          const withoutSelfRemainTime = bigMaxTime - sharedBoss.defeatTime
          maxDefeatTime = Math.min(maxDefeatTime, withoutSelfRemainTime)
          const sharedBossMesosBase =
            currentBossAllMesos[sharedBoss.difficulty] ||
            currentBossAllDefaultMesos[sharedBoss.difficulty]
          const sharedBossMesos = Math.floor(
            sharedBossMesosBase / (storeBossData.partyCount || 1)
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
                drops: bossDrops,
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
  )(BossMapping[currentRegion])
  return mergedData
}

export default curry(getBossSuggestion)
