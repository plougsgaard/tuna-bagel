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

export const addEntriesReducer = ([
  requestType,
  successType,
  failureType
]) => (state = {
  entries: [],
  entriesAdd: [],
  errorAdd: null,
  statsAdd: {
    timesRequested: 0,
    timesFailed: 0
  }
}, action = {}) => {
  const { type, body, payload, error } = action
  switch (type) {
    case requestType:
      return {
        ...state,
        entriesAdd: _.concat(state.entriesAdd, payload),
        statsAdd: {
          ...state.statsAdd,
          timesRequested: (state.statsAdd.timesRequested + 1)
        }
      }
    case successType:
      return {
        ...state,
        entries: _.concat(state.entries, body),
        entriesAdd: _.without(state.entriesAdd, payload),
        lastUpdated: Date.now()
      }
    case failureType:
      return {
        ...state,
        errorAdd: error,
        statsAdd: {
          ...state.statsAdd,
          timesFailed: (state.statsAdd.timesFailed + 1)
        }
      }
    default:
      return state
  }
}

export const updateEntriesReducer = ([
  requestType,
  successType,
  failureType
]) => (state = {
  entries: [],
  entriesUpdate: [],
  errorUpdate: null,
  statsUpdate: {
    timesRequested: 0,
    timesFailed: 0
  }
}, action = {}) => {
  const { type, body, payload, error } = action
  const entry = payload && _.find(state.entries, { id: payload.id })
  switch (type) {
    case requestType:
      return {
        ...state,
        entriesUpdate: _.concat(state.entriesUpdate, payload),
        statsUpdate: {
          ...state.statsUpdate,
          timesRequested: (state.statsUpdate.timesRequested + 1)
        }
      }
    case successType:
      return {
        ...state,
        entries: _.concat(_.without(state.entries, entry), body),
        entriesUpdate: _.without(state.entriesUpdate, payload),
        lastUpdated: Date.now()
      }
    case failureType:
      return {
        ...state,
        errorUpdate: error,
        statsUpdate: {
          ...state.statsUpdate,
          timesFailed: (state.statsUpdate.timesFailed + 1)
        }
      }
    default:
      return state
  }
}

export const updateEntryReducer = ([
  requestType,
  successType,
  failureType
]) => (state = {
  entry: {},
  errorUpdate: null,
  statsUpdate: {
    timesRequested: 0,
    timesFailed: 0
  }
}, action = {}) => {
  const { type, body, payload, error } = action
  const entry = payload && _.find(state.entries, { id: payload.id })
  switch (type) {
    case requestType:
      return {
        ...state,
        loading: true,
        statsUpdate: {
          ...state.statsUpdate,
          timesRequested: (state.statsUpdate.timesRequested + 1)
        }
      }
    case successType:
      return {
        ...state,
        loading: false,
        entry: body,
        lastUpdated: Date.now()
      }
    case failureType:
      return {
        ...state,
        loading: false,
        errorUpdate: error,
        statsUpdate: {
          ...state.statsUpdate,
          timesFailed: (state.statsUpdate.timesFailed + 1)
        }
      }
    default:
      return state
  }
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
  errorLoad: null,
  statsLoad: {
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
        statsLoad: {
          ...state.statsLoad,
          timesRequested: (state.statsLoad.timesRequested + 1)
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
        errorLoad: error,
        statsLoad: {
          ...state.statsLoad,
          timesFailed: (state.statsLoad.timesFailed + 1)
        }
      }
    default:
      return state
  }
}

export const loadEntryReducer = ([
  requestType,
  successType,
  failureType
]) => (state = {
  loading: false,
  loaded: false,
  lastUpdated: null,
  entry: {},
  errorLoad: null,
  statsLoad: {
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
        statsLoad: {
          ...state.statsLoad,
          timesRequested: (state.statsLoad.timesRequested + 1)
        }
      }
    case successType:
      return {
        ...state,
        loading: false,
        loaded: true,
        entry: body,
        lastUpdated: Date.now()
      }
    case failureType:
      return {
        ...state,
        loading: false,
        loaded: false,
        errorLoad: error,
        statsLoad: {
          ...state.statsLoad,
          timesFailed: (state.statsLoad.timesFailed + 1)
        }
      }
    default:
      return state
  }
}

export const deleteEntryReducer = ([
  requestType,
  successType,
  failureType
]) => (state = {
  entries: [],
  meta: {
    // [id]: { type: 'delete', state: 'request|success|error' }
  }
}, action = {}) => {
  const { type, body, payload, error } = action
  const entry = payload && _.find(state.entries, { id: payload.id })
  switch (type) {
    case requestType:
      return {
        ...state,
        meta: {
          ...state.meta,
          [payload.id]: {
            type: 'delete',
            state: 'request'
          }
        }
      }
    case successType:
      return {
        ...state,
        entries: _.without(state.entries, entry),
        meta: {
          ...state.meta,
          [payload.id]: {
            type: 'delete',
            state: 'success'
          }
        },
        lastUpdated: Date.now()
      }
    case failureType:
      return {
        ...state,
        meta: {
          ...state.meta,
          [payload.id]: {
            type: 'delete',
            state: error
          }
        }
      }
    default:
      return state
  }
}
