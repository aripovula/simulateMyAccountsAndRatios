import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import { startSetPostings } from './actions/postings';
import LoadingModal from './components/LoadingModal';
import LoadFailedModal from './components/LoadFailedModal';


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

const loading = (
  <LoadingModal
    mainText='Loading app related DATA. Please wait'
    shortText='Loading ...'
  />
);

if (!hasRendered) {
  setTimeout(()=>restoreTimedOut(), 10 * 1000);
  ReactDOM.render(loading, document.getElementById('app'));
}

const restoreTimedOut = () => {
  if (!hasRendered ) {
    const loadingF = (
      <LoadFailedModal
        mainTextFail='Either (1) DATA loading failed, (2) no connection or (3) other error occurred !'
        shortText=''
      />);
    ReactDOM.render(loadingF, document.getElementById('app'));
  }
}

firebase.auth().onAuthStateChanged((user) => {
  // console.log('user' + user);
  if (user) {
    // console.log('logged in - user - ' + user);
    store.dispatch(login(user.uid));
    store.dispatch(startSetPostings()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    // console.log('logged out - user - ' + user);
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

export default store;