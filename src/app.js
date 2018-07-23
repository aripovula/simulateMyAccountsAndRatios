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
let isSecondTime = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

const loading = (
  <LoadingModal
    mainText='App loading. Please wait'
    shortText='Loading ...'
  />
);

if (!hasRendered) ReactDOM.render(loading, document.getElementById('app'));

const scheduleTimeOut = () => {
  // console.log('in scheduleTimeOut isSecondTime='+isSecondTime+'   hasRendered='+hasRendered);
  if (!hasRendered && isSecondTime) {
    const loadingF = (
      <LoadFailedModal
        mainText='App loading FAILED. Please check your INTERNET connection !'
        shortText=''
      />);
    ReactDOM.render(loadingF, document.getElementById('app'));
  }
  setTimeout(scheduleTimeOut, 10 * 1000);
  isSecondTime = true;
}
scheduleTimeOut();


firebase.auth().onAuthStateChanged((user) => {
  console.log('user' + user);
  if (user) {
    console.log('logged in - user - ' + user);
    store.dispatch(login(user.uid));
    store.dispatch(startSetPostings()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    console.log('logged out - user - ' + user);
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

export default store;