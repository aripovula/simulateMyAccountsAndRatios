import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
// import { addPosting } from './actions/postings';
// import { setTextFilter } from './actions/filters';
// import getVisiblePostings from './selectors/postings';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './firebase/firebase';

const store = configureStore();

// const state = store.getState();
// const visiblePostings = getVisiblePostings(state.postings, state.filters);
// console.log(visiblePostings);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

// ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// store.dispatch(startSetPosting()).then(() => {
//   ReactDOM.render(jsx, document.getElementById('app'));
// });

