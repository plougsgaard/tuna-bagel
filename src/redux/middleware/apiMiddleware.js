import _ from 'lodash'

export const isPromise = (val) => val && typeof val.then === 'function'

/**
 * Cache Strategy: Always call API (default)
 */
export const callAlways = () => true

/**
 * Cache Strategy: Call when there is no data yet
 */
export const callWhenNoData = (mountPoint, dataKey = 'body') => (state) =>
  _.isEmpty(_.get(state, `${mountPoint}.${dataKey}`))

/**
 * Cache Strategy: Call when data hasn't recently been updated (2 minutes)
 */
export const callWhenExpired = (mountPoint, lastUpdatedKey = 'lastUpdated') => (state) => {
  const lastUpdated = _.get(state, `${mountPoint}.${lastUpdatedKey}`)
  return !lastUpdated || lastUpdated < Date.now() - 2*60*1000
}

/**
 *
 *
 *
 *
 *
 */
export function apiMiddleware ({ dispatch, getState }) {
  return (next) => async (action) => {
    const {
      types,
      callAPI,
      shouldCallAPI = callAlways,
      payload = {}
    } = action

    if (!types) {
      return next(action)
    }

    if (_.size(types) !== 3) {
      throw new Error('Expected an array of three string types.')
    }

    if (!isPromise(callAPI)) {
      throw new Error('Expected `callAPI` to be a Promise.')
    }

    if (!shouldCallAPI(getState())) {
      console.log('API was not called due to the wise decision of ', shouldCallAPI)
      return
    }

    const [
      requestType,
      successType,
      failureType
    ] = types

    dispatch({
      type: requestType,
      ...payload
    })

    try {
      const body = await callAPI
      dispatch({
        type: successType,
        ...payload,
        body,
        lastUpdated: Date.now()
      })
    }
    catch (error) {
      dispatch({
        type: failureType,
        ...payload,
        error
      })
    }
  }
}
