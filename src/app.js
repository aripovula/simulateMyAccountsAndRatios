import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';

import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import './styles/styles.scss';
import {firebase} from './firebase/firebase';
import { startSetPostings } from './actions/postings';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

// ReactDOM.render(jsx, document.getElementById('app'));

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// store.dispatch(startSetPosting()).then(() => {
//   ReactDOM.render(jsx, document.getElementById('app'));
// });

firebase.auth().onAuthStateChanged((user) => {
  console.log('user'+user);
  if (user) {
    console.log('logged in - user - '+user);
    store.dispatch(login(user.uid));
    store.dispatch(startSetPostings()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    console.log('logged out - user - '+user);
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});