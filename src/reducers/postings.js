// Postings Reducer

const postingsReducerDefaultState = [];

export default (state = postingsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POSTING':
      //console.log('IN ADD POSTING');
      return [
        ...state,
        action.posting
      ];
    case 'REMOVE_POSTING':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_POSTING':
      return state.map((posting) => {
        if (posting.id === action.id) {
          return {
            ...posting,
            ...action.updates
          };
        } else {
          return posting;
        };
      });
    case 'SET_POSTINGS':
      return action.postings;
    default:
      return state;
  }
};
