import _ from 'lodash'
import { httpRequest } from '../../network'

/**
 *
 *
 *
 *
 *
 */
export function apiAdd ({ dispatch, getState }) {
  return (next) => async (action) => {
    const {
      api,
      types,
      path,
      payload
    } = action

    if (api !== 'add') {
      return next(action)
    }

    //console.log('apiAdd', action)

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
      method: 'post',
      body: payload
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
    catch (error) {
      dispatch({
        type: failureType,
        error,
        payload
      })
    }
  }
}