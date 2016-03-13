import _ from 'lodash'

/**
 * Merges reducers into a single reducer after calculating
 * their initial combined state.
 *
 * Similar but not equal to https://github.com/acdlite/reduce-reducers
 */
export const mergeReducers = (...reducers) => {
  const defaultState = _.reduce(reducers,
    (memo, reducer) => _.merge(memo, reducer()), {})
  return (state = defaultState, action) =>
    _.reduce(reducers, (memo, reducer) => reducer(memo, action), state)
}


export const loadEntriesReducer = ([
  requestType,
  successType,
  failureType
]) => (state = {
  loaded: false,
  loading: false,
  lastUpdated: null,
  entries: [],
  error: null,
  stats: {
    timesRequested: 0,
    timesFailed: 0
  }
}, action = {}) => {
  const { type, body, error } = action
  switch (type) {
    case requestType:
      return {
        ...state,
        loading: true,
        stats: {
          ...state.stats,
          timesRequested: (state.stats.timesRequested + 1)
        }
      }
    case successType:
      return {
        ...state,
        loading: false,
        loaded: true,
        entries: body,
        lastUpdated: Date.now()
      }
    case failureType:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
        stats: {
          ...state.stats,
          timesFailed: (state.stats.timesFailed + 1)
        }
      }
    default:
      return state
  }
}
