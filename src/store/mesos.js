import { reducerCreator } from './_helper'

import { pipe, mergeDeepLeft } from 'ramda'

export const INIT_MESOS_DATA = 'INIT_MESOS_DATA'
export const UPDATE_MESOS_DATA = 'UPDATE_MESOS_DATA'
export const RESET_MESOS_DATA = 'RESET_MESOS_DATA'

const storageKey = 'MAPLESTORY_BOSS_MESOS_DATA'

const saveToStroage = (state) => {
  localStorage.setItem(storageKey, JSON.stringify(state))
  return state
}

const initialState = {
  TWMS: {},
  GMS: {},
}

const reducer = reducerCreator(initialState, {
  [INIT_MESOS_DATA]: (state, payload) => {
    return mergeDeepLeft(payload)(state)
  },
  [UPDATE_MESOS_DATA]: (state, payload) =>
    pipe(
      mergeDeepLeft({
        [payload.region]: {
          [payload.name]: {
            [payload.difficulty]: payload.mesos,
          },
        },
      }),
      saveToStroage
    )(state),
  [RESET_MESOS_DATA]: (state) => pipe(() => initialState, saveToStroage)(state),
})

export default {
  initialState,
  reducer,
}
