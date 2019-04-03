import filterReducer from '../../reducers/filters';


// const aPosting = {
//     createdAt: 1, isUnPosted: false,
//     linesData: [{ amount: 1234, idu: 0, isDr: true, lineItem: "Cash", lineItemID: 1 },
//     { amount: 1234, idu: 1, isDr: false, lineItem: "Loan", lineItemID: 21 }],
//     note: 'abc1234', postingDate: 1234, totalAmount: 2468
// };

// const postings = [aPosting, aPosting, aPosting];
// postings[0].note = 'xyz1234';
// postings[2].note = 'opr1234';

it('should set default values', () => {
    const state = filterReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        lineItem: '',
        amountF: '',
        sortBy: 'createdDate',
        startDate: expect.anything(),
        endDate: expect.anything()
    } );
});

it('should set sortBy to amount', () => {
    const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

it('should set sortBy to createdDate', () => {
    const changeDefaultSortValueFirst = {
        text: '',
        lineItem: '',
        amountF: '',
        sortBy: 'amount',
        startDate: 0,
        endDate: 0
    };

    const state = filterReducer(changeDefaultSortValueFirst, { type: 'SORT_BY_CREATED_DATE' });
    expect(state.sortBy).toBe('createdDate');
});

it('should set text filter', () => {
    const state = {
        text: 'revenue',
        lineItem: '',
        amountF: '',
        sortBy: '',
        startDate: 0,
        endDate: 0
    };

    const updatedState = filterReducer(state, { type: 'SET_TEXT_FILTER' });
    expect(state.text).toBe('revenue');
});

it('should set startDate filter', () => {
    const state = {
        text: '',
        lineItem: '',
        amountF: '',
        sortBy: '',
        startDate: 1234,
        endDate: 0
    };

    const updatedState = filterReducer(state, { type: 'SET_START_DATE' });
    expect(state.startDate).toBe(1234);
});

it('should set startDate filter', () => {
    const state = {
        text: '',
        lineItem: '',
        amountF: '',
        sortBy: '',
        startDate: 0,
        endDate: 1234
    };

    const updatedState = filterReducer(state, { type: 'SET_END_DATE' });
    expect(state.endDate).toBe(1234);
});