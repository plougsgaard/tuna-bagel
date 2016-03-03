import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import promiseMiddleware from './promiseMiddleware'
import createLogger from 'redux-logger'

import DevTools from './DevTools'

import * as reducers from './reducers'

const logger = createLogger({
  level: 'info',
  duration: true,
  actionTransformer: (action) => ({
    ...action,
    type: String(action.type)
  })
})

const composition = compose(
  applyMiddleware( promiseMiddleware, logger ),
  DevTools.instrument()
)
const createStoreWithMiddleware = composition(createStore)
const reducer = combineReducers(reducers)

const store = createStoreWithMiddleware(reducer)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers')
    store.replaceReducer(nextReducer)
  })
}

export default store
