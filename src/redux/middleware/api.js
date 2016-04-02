import _ from 'lodash'
import { httpRequest } from '../../network'

/**
 * Actions
 */
export const ADD_ONE = 'tuna-bagel/API/ADD_ONE'
export const LOAD_ONE = 'tuna-bagel/API/LOAD_ONE'
export const LOAD_MANY = 'tuna-bagel/API/LOAD_MANY'
export const UPDATE_ONE = 'tuna-bagel/API/UPDATE_ONE'
export const DELETE_ONE = 'tuna-bagel/API/DELETE_ONE'

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

const makeRequest = async (dispatch, { types, path, payload, forwardErrors}, options) => {
  const [ requestType, successType, failureType ] = types
  try {
    dispatch({
      type: successType,
      body: await httpRequest(path, options),
      payload // TODO replace stuff like this with a transaction id or something
    })
  }
  catch ({ _error }) {
    dispatch({
      type: failureType,
      error: _error,
      payload
    })
    if (forwardErrors) {
      throw { _error }
    }
  }
}

const isApiAction = ({ api, types, path }) =>
  Boolean(api) && Boolean(types) && Boolean(path) && _.size(types) === 3

const apiToMethod = (api) => {
  switch (api) {
    case LOAD_ONE:
    case LOAD_MANY:
      return 'get'
    case DELETE_ONE:
      return 'delete'
    case UPDATE_ONE:
      return 'put'
    case ADD_ONE:
      return 'post'
    default:
      return 'get'
  }
}

export function apiMiddleware ({ dispatch, getState }) {
  return (next) => async (action) => {
    const {
      api,
      types,
      path,
      payload,
      shouldCall = callAlways,
      forwardErrors = false,
      tokenPath = 'session.token'
    } = action

    if (!isApiAction(action)) {
      return next(action)
    }

    if (!shouldCall(getState())) {
      return next(action)
    }

    const [ requestType ] = types

    const options = {
      headers: { token: _.get(getState(), tokenPath) },
      method: apiToMethod(api),
      body: payload
    }

    // make initial request leading to either success or failure
    dispatch({
      type: requestType,
      payload
    })

    // indirectly dispatch either a success or failure action
    return await makeRequest(dispatch, action, options)
  }
}
