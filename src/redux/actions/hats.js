import uuid from 'uuid'

export const LOAD_REQUEST = 'tuna-bagel/hats/LOAD_REQUEST'
export const LOAD_SUCCESS = 'tuna-bagel/hats/LOAD_SUCCESS'
export const LOAD_FAILURE = 'tuna-bagel/hats/LOAD_FAILURE'

export const ADD_REQUEST = 'tuna-bagel/hats/ADD_REQUEST'
export const ADD_SUCCESS = 'tuna-bagel/hats/ADD_SUCCESS'
export const ADD_FAILURE = 'tuna-bagel/hats/ADD_FAILURE'

export const loadHats = () => ({
  api: 'load',
  types: [ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ],
  path: '/hats'
})

export const addHat = (name) => {
  const id = uuid.v4()
  const payload = {
    name,
    id
  }
  return {
    api: 'add',
    types: [ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ],
    path: '/hats',
    payload
  }
}

export const foobar = () => ({
  type: 'FOOBAR'
})
