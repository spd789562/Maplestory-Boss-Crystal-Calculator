import { reducerCreator } from './_helper'

export const CHANGE_REGION = 'CHANGE_REGION'
export const CHANGE_BOSS_OPTIONS = 'CHANGE_BOSS_OPTIONS'
export const CHANGE_ADVANCED = 'CHANGE_ADVANCED'

const isClient = typeof window !== 'undefined'

const initialState = {
  region: (isClient && localStorage.getItem('region')) || 'TWMS',
  advanced: (isClient && localStorage.getItem('advanced')) || false,
  bossOptions: (isClient &&
    localStorage.getItem('bossOptions') &&
    localStorage.getItem('bossOptions').split(',')) || [
    'difficulty',
    'partyCount',
    'defeatTime',
  ],
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
  [CHANGE_ADVANCED]: (state, payload) => {
    localStorage.setItem('advanced', payload)
    return { ...state, advanced: payload }
  },
})

export default {
  initialState,
  reducer,
}
