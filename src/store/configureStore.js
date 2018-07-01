import { createStore, combineReducers } from 'redux';
import postingsReducer from '../reducers/postings';
import filtersReducer from '../reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
      postings: postingsReducer,
      filters: filtersReducer
    })
  );

  return store;
};
