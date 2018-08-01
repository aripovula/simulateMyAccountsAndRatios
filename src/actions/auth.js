import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startSignIn = (email, password) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      if (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('SIGN IN failed =' + error.message);
      } else {
        console.log('SUCCESS SIGN IN');
      }
    });
  }
}

export const startSignUp = (email, password) => {
  console.log('IN ACTION email = '+email);
  return (dispatch, getState) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      if (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('SIGN UP failed =' + error.message);
        dispatch(startSignIn(email, password));
      } else {
        console.log('SUCCESS SIGN UP');
      }
    });
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
