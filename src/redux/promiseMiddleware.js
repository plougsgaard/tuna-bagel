import _ from 'lodash'

const isPromise = (val) => val && typeof val.then === 'function'

const isValidAction = (action) => typeof action.type !== 'undefined'

const promiseMiddleware = ({ dispatch }) =>
  (next) =>
    (action) =>
      isPromise(action.payload)
        ? next(action) && action.payload.then(
            (result) => isValidAction(result)
              ? dispatch(result)
              : dispatch({ ...action, payload: result }),
            (error) => isValidAction(error)
              ? dispatch(error)
              : dispatch({ ...action, payload: error, error: true })
          )
        : next(action)

export default promiseMiddleware
