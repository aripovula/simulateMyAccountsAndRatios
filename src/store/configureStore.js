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
  console.log('STORE FROM STORE='+store);
  const state = store.getState();
  console.log('State FROM STORE='+state);
  return store;
};
