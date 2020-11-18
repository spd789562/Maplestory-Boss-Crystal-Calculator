import { reducerCreator } from './_helper'

export const CHANGE_REGION = 'CHANGE_REGION'

const isClient = typeof window !== 'undefined'

const initialState = {
  region: (isClient && localStorage.getItem('region')) || '',
}

const reducer = reducerCreator(initialState, {
  [CHANGE_REGION]: (state, payload) => {
    localStorage.setItem('region', payload)
    return { ...state, region: payload }
  },
})

export default {
  initialState,
  reducer,
}
