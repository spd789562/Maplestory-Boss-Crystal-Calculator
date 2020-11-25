import { reducerCreator } from './_helper'

export const CHANGE_REGION = 'CHANGE_REGION'
export const CHANGE_BOSS_OPTIONS = 'CHANGE_BOSS_OPTIONS'
export const CHANGE_FILTER_OPTION = 'CHANGE_FILTER_OPTION'
export const CHANGE_ADVANCED = 'CHANGE_ADVANCED'
export const CHANGE_RESET_DAY_OF_WEEK = 'CHANGE_RESET_DAY_OF_WEEK'
export const CHANGE_RESET_HOUR = 'CHANGE_RESET_HOUR'

const initialState = {
  region: 'TWMS',
  advanced: false,
  bossOptions: ['difficulty', 'partyCount', 'defeatTime'],
  filterOption: 'all',
  resetDayOfWeek: 4,
  resetHour: 0,
}

const reducer = reducerCreator(initialState, {
  [CHANGE_REGION]: (state, payload) => {
    localStorage.setItem('region', payload)
    return { ...state, region: payload }
  },
  [CHANGE_BOSS_OPTIONS]: (state, payload) => {
    localStorage.setItem('bossOptions', payload.join(','))
    return { ...state, bossOptions: payload }
  },
  [CHANGE_FILTER_OPTION]: (state, payload) => {
    localStorage.setItem('filterOption', payload)
    return { ...state, filterOption: payload }
  },
  [CHANGE_ADVANCED]: (state, payload) => {
    localStorage.setItem('advanced', payload)
    return { ...state, advanced: payload }
  },
  [CHANGE_RESET_DAY_OF_WEEK]: (state, payload) => {
    localStorage.setItem('resetDayOfWeek', payload)
    return { ...state, resetDayOfWeek: payload }
  },
  [CHANGE_RESET_HOUR]: (state, payload) => {
    localStorage.setItem('resetHour', payload)
    return { ...state, resetHour: payload }
  },
})

export default {
  initialState,
  reducer,
}
