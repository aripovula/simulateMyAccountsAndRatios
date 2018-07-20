import uuid from 'uuid';
import database from '../firebase/firebase';


// ADD_POSTING
export const addPosting = (posting) => ({
  type: 'ADD_POSTING',
  posting
});

export const startAddPosting = (postingData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      linesData,
      note = '',
      totalAmount = '',
      createdAt = 0,
      postingDate = 0,
      isUnPosted = false
    } = postingData;
    const posting = { linesData, note, totalAmount, createdAt, postingDate, isUnPosted };

    return database.ref(`users/${uid}/postings`).push(posting).then((ref) => {
      dispatch(addPosting({
        id: ref.key,
        ...posting
      }));
    });
    // return Promise.resolve();
  };
  
};


//REMOVE_POSTING
export const removePosting = ({ id } = {}) => ({
  type: 'REMOVE_POSTING',
  id
});

export const startRemovePosting = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/postings/${id}`).remove().then(() => {
      dispatch(removePosting({ id }));
    });
  };
};


//EDIT_POSTING
export const editPosting = (id, updates) => ({
  type: 'EDIT_POSTING',
  id,
  updates
});

export const startEditPosting = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/postings/${id}`).update(updates).then(() => {
      dispatch(editPosting(id, updates));
    });
  };
};

// SET_EXPENSES
export const setPostings = (postings) => ({
  type: 'SET_POSTINGS',
  postings
});

export const startSetPostings = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/postings`).once('value').then((snapshot) => {
      const postings = [];

      // console.log('snapshot');
      // console.log(snapshot);
      snapshot.forEach((childSnapshot) => {
        postings.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
        // console.log(childSnapshot);
        // console.log(postings);
        // console.log('After postings');
      });

      dispatch(setPostings(postings));
    });
  };
};