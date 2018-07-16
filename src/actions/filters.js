// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

export const setLineItemFilter = (lineItem = '') => ({
  type: 'SET_LINEITEM_FILTER',
  lineItem
});

export const setAmountFilter = (amountF = '') => ({
  type: 'SET_AMOUNT_FILTER',
  amountF
});

export const setAmountFilterType = (amountFType = 'includes') => ({
  type: 'SET_AMOUNT_FILTER_TYPE',
  amountFType
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

// SORT_BY_STATUS
export const sortByStatus = () => ({
  type: 'SORT_BY_STATUS'
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
