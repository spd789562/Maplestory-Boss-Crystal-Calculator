import { reducerCreator } from './_helper'

export const CHANGE_REGION = 'CHANGE_REGION'
export const CHANGE_BOSS_OPTIONS = 'CHANGE_BOSS_OPTIONS'

const isClient = typeof window !== 'undefined'

const initialState = {
  region: (isClient && localStorage.getItem('region')) || '',
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
})

export default {
  initialState,
  reducer,
}
