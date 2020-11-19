import { reducerCreator } from './_helper'

import {
  curry,
  evolve,
  findIndex,
  pipe,
  propEq,
  not,
  update,
  mergeRight,
} from 'ramda'

import BossMapping from '@mapping/bosses-crystal'

export const TOGGLE_BOSS_DEFEATABLE = 'TOGGLE_BOSS_DEFEATABLE'
export const UPDATE_BOSS_DATA = 'UPDATE_BOSS_DATA'

const findBossIndexById = curry((id, bosses) =>
  findIndex(propEq('id', id), bosses)
)

const initialState = BossMapping.map(({ id, difficulties }) => ({
  id,
  defeatable: true,
  partyCount: 1,
  defeatTime: 0,
  difficulty: difficulties[difficulties.length - 1].difficulty,
}))

const reducer = reducerCreator(initialState, {
  [TOGGLE_BOSS_DEFEATABLE]: (state, payload) =>
    pipe(findBossIndexById(payload), (index) =>
      update(index, evolve({ defeatable: not }, state[index]), state)
    )(state),
  [UPDATE_BOSS_DATA]: (state, payload) =>
    pipe(findBossIndexById(payload.id), (index) =>
      update(index, mergeRight(state[index], payload.data), state)
    )(state),
})

export default {
  initialState,
  reducer,
}
