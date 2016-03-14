import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { apiMiddleware } from '../middleware/apiMiddleware'
import {rootReducer} from '../reducers'
import DevTools from '../DevTools'

const logger = createLogger({
  level: 'info',
  duration: true,
  actionTransformer: (action) => ({
    ...action,
    type: String(action.type)
  })
})

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        apiMiddleware,
        // logger
      ),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}