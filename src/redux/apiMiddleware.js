///////////////
/// https://github.com/jaredpalmer/react-production-starter/blob/ae325b66fcdb72af6271220b70950b4847a6abbe/src/middleware/callAPIMiddleware.js
///
/// https://github.com/agraboso/redux-api-middleware
///
/// that one might me `meh` though
///
//////////////

export function apiMiddleware ({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected fetch to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch(Object.assign({}, payload, {
      type: requestType,
    }));

    return callAPI().then(
      response => dispatch(Object.assign({}, payload, {
        body: response,
        lastFetched: Date.now(),
        type: successType,
      })),
      error => dispatch(Object.assign({}, payload, {
        error,
        type: failureType,
      }))
    );
  };
}
