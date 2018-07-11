// separateLines Reducer

const separateLinesReducerDefaultState = [];

export default (state = separateLinesReducerDefaultState, action) => {
  // console.log('in separateLines Reducer type ='+action.type);
  switch (action.type) {
    case 'ADD_SEPARATED_LINE':
    //console.log('IN ADD_SEPARATED_LINE');
      return [
        ...state,
        action.separatedLine
      ];

    case 'REMOVE_SEPARATED_POSTING_LINE':
      return state.filter(({ id }) => id !== action.id);

    default:
      return state;
  }
};
