import _ from 'lodash'
import { httpRequest } from '../../network'

export const UPDATE_ONE = 'tuna-bagel/API/UPDATE_ONE'

export function apiUpdate ({ dispatch, getState }) {
  return (next) => async (action) => {
    const {
      api,
      types,
      path,
      payload,
      tokenPath = 'session.token'
    } = action

    if (api !== UPDATE_ONE) {
      return next(action)
    }

    if (_.size(types) !== 3) {
      throw new Error(`Expected an array of three string types.`)
    }

    if (_.isEmpty(path)) {
      throw new Error(`Expected 'path'.`)
    }

    if (_.isEmpty(payload)) {
      throw new Error(`Expected 'payload'.`)
    }

    const [
      requestType,
      successType,
      failureType
    ] = types

    dispatch({
      type: requestType,
      payload
    })

    const options = {
      method: 'put',
      body: payload,
      headers: {
        token: _.get(getState(), tokenPath)
      }
    }

    try {
      const body = await httpRequest(path, options)
      dispatch({
        type: successType,
        body,
        lastUpdated: Date.now(),
        payload
      })
    }
    catch ({ _error }) {
      dispatch({
        type: failureType,
        errorUpdate: _error,
        payload
      })
    }
  }
}
