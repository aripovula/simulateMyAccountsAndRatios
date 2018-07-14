import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import postingsReducer from '../reducers/postings';
import filtersReducer from '../reducers/filters';
import separateLinesReducer from '../reducers/separateLines';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      postings: postingsReducer,
      filters: filtersReducer,
      separateLines: separateLinesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  
  // console.log('STORE FROM STORE=');
  // console.log(store);
  //const state = store.getState();
  // console.log('State FROM STORE=');
  // console.log(state);
  return store;
};
