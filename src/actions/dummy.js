import uuid from 'uuid';


export const addDummy = (dummy) => ({
  type: 'SET_DUMMY',
  dummy
});

export const startAddDummy = (obj = {}) => {
  return (dispatch, getState) => {
    const {
      dummy
    } = obj;
    
    const newObj = obj.dummy = 'changedValue';
    console.log('newObj-', newObj);
    
    dispatch(addDummy(newObj));
  };
  
};


//REMOVE_DUMMY
// export const removePosting = ({ id } = {}) => ({
//   type: 'REMOVE_POSTING',
//   id
// });

// export const startRemovePosting = ({ id } = {}) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     return database.ref(`users/${uid}/postings/${id}`).remove().then(() => {
//       dispatch(removePosting({ id }));
//     });
//   };
// };
