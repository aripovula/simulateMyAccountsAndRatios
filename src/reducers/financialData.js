// FinData Reducer

const financialDataReducerDefaultState = [];

export default (state = financialDataReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FINANCIAL_DATA':
            return action.financialData;
        case 'SET_RATIO_DATA':
            return action.ratioData;
        default:
            return state;
    }
};
