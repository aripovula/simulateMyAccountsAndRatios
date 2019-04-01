import selectPostings from '../../selectors/postings';


const aPosting = {
    createdAt: 1, isUnPosted: false,
    linesData: [{ amount: 1234, idu: 0, isDr: true, lineItem: "Cash", lineItemID: 1 },
    { amount: 1234, idu: 1, isDr: false, lineItem: "Loan", lineItemID: 21 }],
    note: 'abc1234', postingDate: 1234, totalAmount: 2468
};

const postings = [ aPosting, aPosting, aPosting ];
postings[0].note = 'xyz1234';
postings[2].note = 'opr1234';

it ('should filter by text value', () => {

    const filter = { 
        postings, text: 'a', lineItem: null, amountF: null,
        amountFType: null, sortBy: null, startDate: null, endDate: null
    };
    const result = selectPostings(postings, filter);
    expect(result).toEqual( [ postings[1] ] ); 
});