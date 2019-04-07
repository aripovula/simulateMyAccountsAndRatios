import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import postingsReducer from '../reducers/postings';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import dummyReducer from '../reducers/dummy';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const middlewares = [thunk];

export default () => {
  const store = createStore(
    combineReducers({
      postings: postingsReducer,
      filters: filtersReducer,
      auth: authReducer,
      dummy: dummyReducer
    }),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
};
