import uuid from 'uuid';
import database from '../firebase/firebase';


// ADD_POSTING
// export const addPosting = (
//   {
//     linesData,
//     note = '',
//     totalAmount = '',
//     createdAt = 0,
//     postingDate = 0
//   } = {}
// ) => ({
//   type: 'ADD_POSTING',
//   posting: {
//     id: uuid(),
//     linesData,
//     note,
//     totalAmount,
//     createdAt,
//     postingDate
//   }
// });

// ADD_EXPENSE
export const addPosting = (posting) => ({
  type: 'ADD_POSTING',
  posting
});

export const startAddPosting = (postingData = {}) => {
  return (dispatch) => {
    const {
      linesData,
      note = '',
      totalAmount = '',
      createdAt = 0,
      postingDate = 0
    } = postingData;
    const posting = { linesData, note, totalAmount, createdAt, postingDate };

    return database.ref('postings').push(posting).then((ref) => {
      dispatch(addPosting({
        id: ref.key,
        ...posting
      }));
    });
    // return Promise.resolve();
  };
  
};


// REMOVE_POSTING
export const removePosting = ({ id } = {}) => ({
  type: 'REMOVE_POSTING',
  id
});

// EDIT_POSTING
export const editPosting = (id, updates) => ({
  type: 'EDIT_POSTING',
  id,
  updates
});
