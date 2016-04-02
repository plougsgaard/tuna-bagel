import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { apiLoad } from '../middleware/apiLoad'
import { apiAdd } from '../middleware/apiAdd'
import { apiUpdate } from '../middleware/apiUpdate'
import { apiDelete } from '../middleware/apiDelete'
import { rootReducer } from '../reducers'

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
        apiLoad,
        apiAdd,
        apiUpdate,
        apiDelete
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
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
