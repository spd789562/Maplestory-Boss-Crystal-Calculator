import { useReducer, useMemo } from 'react'

import {
  createContext,
  useContext,
  useContextSelector,
} from 'use-context-selector'

import { combineReducer } from './_helper'
import bossReducer from './boss'
import metaReducer from './meta'
import mesosReducer from './mesos'

import { isNil, prop, curry, path, pickAll, pipe } from 'ramda'

const GlobalStore = createContext({})

const [combinedReducers, initialState] = combineReducer({
  boss: bossReducer,
  meta: metaReducer,
  mesos: mesosReducer,
})

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState)
  return (
    <GlobalStore.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GlobalStore.Provider>
  )
}

// export const useDispatch = () => useContext(GlobalStore).dispatch
export const useDispatch = () =>
  useContextSelector(GlobalStore, prop('dispatch'))

export const useStroeSelector = (field, selector) =>
  useContextSelector(GlobalStore, pipe(prop(field), selector))

export const useStore = (keyPath, initialValue = null) => {
  const dispatch = useDispatch()
  let keys = []
  if (keyPath.indexOf('.') !== 1) {
    keys = keyPath.split('.')
  } else if (Array.isArray(keyPath)) {
    keys = keyPath
  } else {
    keys = [keyPath]
  }
  let result = useContextSelector(GlobalStore, path(keys))
  if (
    initialValue !== null &&
    result.constructor === Object &&
    Object.keys(result).length === 0
  ) {
    result = initialValue
  }

  return [result, dispatch]
}
