import postingsReducer from '../../reducers/postings';

const aPosting = {
    id: 0, createdAt: 1, isUnPosted: false,
    linesData: [{ amount: 1234, idu: 0, isDr: true, lineItem: "Cash", lineItemID: 1 },
    { amount: 1234, idu: 1, isDr: false, lineItem: "Loan", lineItemID: 21 }],
    note: 'abc1234', postingDate: 1234, totalAmount: 2468
};

const postings = [aPosting, JSON.parse(JSON.stringify(aPosting)), JSON.parse(JSON.stringify(aPosting)) ];
postings[1].id = 1;  
postings[2].id = 2; 

it('should set empty array', () => {

    const state = postingsReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual([]);
});

it('should remove posting by ID', () => {
    const action = {
        type: 'REMOVE_POSTING',
        id: postings[0].id
    }
    const state = postingsReducer(postings, action);
    expect(state).toEqual( [ postings[1], postings[2] ] );
});

it('should NOT remove if posting ID is not found', () => {
    const action = {
        type: 'REMOVE_POSTING',
        id: '+_1'
    }
    const state = postingsReducer(postings, action);
    expect(state).toEqual( postings );
});

it('should add a new posting', () => {
    const newPosting = {
        ...JSON.parse(JSON.stringify(aPosting)),
        id: 3
    };
    const action = {
        type: 'ADD_POSTING',
        posting: newPosting
    }
    const state = postingsReducer(postings, action);
    expect(state).toEqual([...postings, newPosting]);
});

it('should edit a posting', () => {

    const note = 'newTest';
    const action = {
        id: 2,
        type: "EDIT_POSTING",
        updates: {
            note
        }
    }
    const state = postingsReducer(postings, action);
    const amendedPostings = JSON.parse(JSON.stringify(postings));
    amendedPostings[2].note = 'newTest';
    expect(state).toEqual(amendedPostings);
});

it('should not edit if a posting is not found', () => {

    const note = 'newTest';
    const action = {
        id: 10,
        type: "EDIT_POSTING",
        updates: {
            note
        }
    }
    const state = postingsReducer(postings, action);
    expect(state).toEqual(postings);
});

