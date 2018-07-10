import { createStore, combineReducers } from 'redux';
import postingsReducer from '../reducers/postings';
import filtersReducer from '../reducers/filters';
import separateLinesReducer from '../reducers/separateLines';

export default () => {
  const store = createStore(
    combineReducers({
      postings: postingsReducer,
      filters: filtersReducer,
      separateLines: separateLinesReducer
    })
  );
  console.log('STORE FROM STORE=');
  console.log(store);
  const state = store.getState();
  console.log('State FROM STORE=');
  console.log(state);
  return store;
};
