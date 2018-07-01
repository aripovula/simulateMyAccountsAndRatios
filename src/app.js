import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addPosting } from './actions/postings';
import { setTextFilter } from './actions/filters';
import getVisiblePostings from './selectors/postings';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addPosting({ lineItem: 'Water bill', amount: 4500 }));
store.dispatch(addPosting({ lineItem: 'Gas bill', createdAt: 1000 }));
store.dispatch(addPosting({ lineItem: 'Rent', amount: 109500 }));

const state = store.getState();
const visiblePostings = getVisiblePostings(state.postings, state.filters);
console.log(visiblePostings);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
