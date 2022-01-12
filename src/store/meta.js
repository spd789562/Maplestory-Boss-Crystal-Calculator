import { reducerCreator } from './_helper'

import { evolve, join, mergeRight } from 'ramda'

export const UPDATE_META = 'UPDATE_META'
export const CHANGE_BOSS_OPTIONS = 'CHANGE_BOSS_OPTIONS'
export const CHANGE_FILTER_OPTION = 'CHANGE_FILTER_OPTION'

const initialState = {
  region: 'TWMS',
  isReboot: false,
  advanced: false,
  bossOptions: ['difficulty', 'characterCount', 'defeatTime'],
  filterOption: 'all',
  resetDayOfWeek: 4,
  remainDays: 7,
  weekMax: 180,
  resetHour: 0,
}

const reducer = reducerCreator(initialState, {
  [UPDATE_META]: (state, payload) => {
    const data = mergeRight(state, payload)
    localStorage.setItem(
      'meta',
      JSON.stringify(evolve({ bossOptions: join(',') }, data))
    )
    return data
  },
  [CHANGE_BOSS_OPTIONS]: (state, payload) => {
    localStorage.setItem('bossOptions', payload.join(','))
    return { ...state, bossOptions: payload }
  },
  [CHANGE_FILTER_OPTION]: (state, payload) => {
    localStorage.setItem('filterOption', payload)
    return { ...state, filterOption: payload }
  },
})

export default {
  initialState,
  reducer,
}
