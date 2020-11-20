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

export const INIT_BOSS_DATA = 'INIT_BOSS_DATA'
export const TOGGLE_BOSS_DEFEATABLE = 'TOGGLE_BOSS_DEFEATABLE'
export const UPDATE_BOSS_DATA = 'UPDATE_BOSS_DATA'
export const SET_BOSS_DEFEATED = 'SET_BOSS_DEFEATED'
export const CANCEL_BOSS_DEFEATED = 'CANCEL_BOSS_DEFEATED'
export const RESET_BOSS_DATA = 'RESET_BOSS_DATA'

const storageKey = 'MAPLESTORE_BOSS_CRYSTAL_CALCULATOR_DATA'

const findBossIndexById = curry((id, bosses) =>
  findIndex(propEq('id', id), bosses)
)

const saveToStroage = (state) => {
  localStorage.setItem(storageKey, JSON.stringify(state))
  return state
}

const initialState = BossMapping.map(({ id, difficulties }) => ({
  id,
  defeatable: false,
  partyCount: 1,
  defeatTime: 0,
  difficulty: difficulties[difficulties.length - 1].difficulty,
}))

const reducer = reducerCreator(initialState, {
  [INIT_BOSS_DATA]: (_, payload) => payload,
  [TOGGLE_BOSS_DEFEATABLE]: (state, payload) =>
    pipe(
      findBossIndexById(payload),
      (index) =>
        update(index, evolve({ defeatable: not }, state[index]), state),
      saveToStroage
    )(state),
  [UPDATE_BOSS_DATA]: (state, payload) =>
    pipe(
      findBossIndexById(payload.id),
      (index) => update(index, mergeRight(state[index], payload.data), state),
      saveToStroage
    )(state),
  [SET_BOSS_DEFEATED]: (state, payload) =>
    pipe(
      findBossIndexById(payload),
      (index) =>
        update(
          index,
          mergeRight(
            state[index],
            state[index].defeatable
              ? {
                  defeatDate: new Date().getTime(),
                  defeatTime: state[index].defeatTime + 1,
                }
              : {}
          ),
          state
        ),
      saveToStroage
    )(state),
  [CANCEL_BOSS_DEFEATED]: (state, payload) =>
    pipe(
      findBossIndexById(payload),
      (index) =>
        update(
          index,
          mergeRight(state[index], {
            defeatDate: 0,
            defeatTime: state[index].defeatTime - 1,
          }),
          state
        ),
      saveToStroage
    )(state),
  [RESET_BOSS_DATA]: () => initialState,
})

export default {
  initialState,
  reducer,
}
