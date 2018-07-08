// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
  });
  
  // SORT_BY_CREATED_DATE
  export const sortByCreatedDate = () => ({
    type: 'SORT_BY_CREATED_DATE'
  });

  // SORT_BY_POSTING_DATE
  export const sortByPostingDate = () => ({
    type: 'SORT_BY_POSTING_DATE'
  });
  
  // SORT_BY_AMOUNT
  export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
  });
  
  // SET_START_DATE
  export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
  });
  
  // SET_END_DATE
  export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
  });
  