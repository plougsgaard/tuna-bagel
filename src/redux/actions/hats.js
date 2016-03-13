export const LOAD_REQUEST = 'tuna-bagel/hats/LOAD_REQUEST'
export const LOAD_SUCCESS = 'tuna-bagel/hats/LOAD_SUCCESS'
export const LOAD_FAILURE = 'tuna-bagel/hats/LOAD_FAILURE'

export const loadHats = () => ({
  types: [ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ],
  path: '/hats'
})

export const foobar = () => ({
  type: 'FOOBAR'
})
