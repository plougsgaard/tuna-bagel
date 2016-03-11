import _ from 'lodash'
import { httpRequest } from '../../network'

export const LOAD_ONE = 'tuna-bagel/API/LOAD_ONE'
export const LOAD_MANY = 'tuna-bagel/API/LOAD_MANY'

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
 */
export function apiLoad ({ dispatch, getState }) {
  return (next) => async (action) => {
    const {
      api,
      types,
      path,
      shouldCall = callAlways,
      tokenPath = 'session.token'
    } = action

    if (api !== LOAD_ONE && api !== LOAD_MANY) {
      return next(action)
    }

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
      type: requestType
    })

    const options = {
      method: 'get',
      headers: {
        token: _.get(getState(), tokenPath)
      }
    }

    try {
      const body = await httpRequest(path, options)
      dispatch({
        type: successType,
        body,
        lastUpdated: Date.now()
      })
    }
    catch ({ _error }) {
      dispatch({
        type: failureType,
        errorLoad: _error
      })
    }
  }
}
