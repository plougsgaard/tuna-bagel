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

const getDefaultState = (entryKey) => ({
  [entryKey]: null, // entry|entries
  transactions: {},
  lastUpdated: null
})

const apiReducer = ({ actionType, transform, entryKey = 'entries' }) => ([
  requestType,
  successType,
  failureType
]) => (state = getDefaultState(entryKey), action = {}) => {
  const {
    type,
    body,
    payload,
    error,
    transactionId
  } = action
  switch (type) {
    case requestType:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [transactionId]: {
            actionType,
            stage: 'request'
          }
        }}
    case successType:
      return {
        ...state,
        [entryKey]: transform(state, action),
        lastUpdated: Date.now(),
        transactions: {
          ...state.transactions,
          [transactionId]: {
            actionType,
            stage: 'success'
          }
        }}
    case failureType:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [transactionId]: {
            actionType,
            stage: 'failure',
            error
          }
        }}
    default:
      return state
  }
}

//
// CRUD API Reducers for collections ('entries')
//

export const addEntriesReducer = apiReducer({
  actionType: 'add',
  transform: (state, action) => _.concat(state.entries, action.body)
})

export const loadEntriesReducer = apiReducer({
  actionType: 'load',
  transform: (state, { body }) => body
})

export const updateEntriesReducer = apiReducer({
  actionType: 'update',
  transform: ({ entries }, { payload, body }) => {
    const entry = payload && _.find(entries, { id: payload.id })
    return _.concat(_.without(entries, entry), body)
  }
})

export const deleteEntriesReducer = apiReducer({
  actionType: 'delete',
  transform: ({ entries }, { payload, body }) => {
    const entry = payload && _.find(entries, { id: payload.id })
    return _.without(entries, entry)
  }
})

//
// CRUD API Reducers for singletons ('entry')
//

export const loadEntryReducer = apiReducer({
  actionType: 'load',
  transform: (state, { body }) => body,
  entryKey: 'entry'
})

export const updateEntryReducer = apiReducer({
  actionType: 'update',
  transform: (state, { body }) => body,
  entryKey: 'entry'
})
