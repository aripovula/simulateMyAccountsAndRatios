import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  lineItem: '',
  amountF: '',
  sortBy: 'createdDate',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SET_LINEITEM_FILTER':
      return {
        ...state,
        lineItem: action.lineItem
      };
    case 'SET_AMOUNT_FILTER':
      return {
        ...state,
        amountF: action.amountF
      };
    case 'SET_AMOUNT_FILTER_TYPE':
      console.log('SET_AMOUNT_FILTER_TYPE = '+action.amountFType);
      return {
        ...state,
        amountFType: action.amountFType
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_CREATED_DATE':
      return {
        ...state,
        sortBy: 'createdDate'
      };
    case 'SORT_BY_POSTING_DATE':
      return {
        ...state,
        sortBy: 'postingDate'
      };

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
