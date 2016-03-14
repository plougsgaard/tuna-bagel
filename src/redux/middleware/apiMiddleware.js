import _ from 'lodash'
import { httpRequest } from '../../network'

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
      api,
      types,
      path,
      options = {
        method: 'get'
      },
      body,
      shouldCall = callAlways,
      payload = {}
    } = action

    if (api !== 'load') {
      return next(action)
    }

    //console.log('apiMiddleware', action)

    if (!types) {
      return next(action)
    }

    if (_.size(types) !== 3) {
      throw new Error(`Expected an array of three string types.`)
    }

    if (_.isEmpty(path)) {
      throw new Error(`Expected 'path'.`)
    }

    if (!shouldCall(getState())) {
      console.log('API was not called due to the wise decision of ', shouldCall)
      return next(action)
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
      const body = await httpRequest(path, options)
      dispatch({
        type: successType,
        body,
        lastUpdated: Date.now(),
        ...payload
      })
    }
    catch (error) {
      dispatch({
        type: failureType,
        error,
        ...payload
      })
    }
  }
}
