import _ from 'lodash'
import { httpRequest } from '../../network'

export const DELETE_ONE = 'tuna-bagel/API/DELETE_ONE'

export function apiDelete ({ dispatch, getState }) {
  return (next) => async (action) => {
    const {
      api,
      types,
      path,
      payload,
      forwardErrors = false,
      tokenPath = 'session.token'
    } = action

    if (api !== DELETE_ONE) {
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
      method: 'delete',
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
        payload
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
}
