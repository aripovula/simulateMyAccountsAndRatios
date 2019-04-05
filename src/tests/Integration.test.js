import React from 'react';
import uuid from 'uuid';
import configureStore from '../store/configureStore';
import { startAddDummy } from '../actions/dummy';
import { startAddPostingSkipFb, startAddPostingSimulateDelay } from '../actions/postings';

const store = configureStore();
// console.log(store.getState());

const dummyObj = { dummy: 'test12' }

describe('Actual Store + reducers, Integration test', () => {

    it('should set Store value when dummy data is dispatched', async () => {
        
        const oldState = store.getState();
        
        store.dispatch(startAddDummy(dummyObj));
        const newState = store.getState();
        const expected = JSON.parse(JSON.stringify(oldState));
        // although dispatch sends dummyObject middleware function in 
        // dummy action file changes dummy's value to 'changedValue'
        expected.dummy = { dummy: "changedValue" };
        
        expect(JSON.stringify(newState)).toEqual(JSON.stringify(expected));
    });

})


describe('Actual Store + reducers, Integration test', () => {

    const aPosting = {
        createdAt: 1, isUnPosted: false,
        linesData: [{ amount: 1234, idu: 0, isDr: true, lineItem: "Cash", lineItemID: 1 },
        { amount: 1234, idu: 1, isDr: false, lineItem: "Loan", lineItemID: 21 }],
        note: 'abc1234', postingDate: 1234, totalAmount: 2468
    };

    it('should set Store value when a new posting is dispatched', async () => {

        const oldState = store.getState();
        const id = uuid();
        store.dispatch(startAddPostingSkipFb(aPosting, id));
        const newState = store.getState();
        const expected = JSON.parse(JSON.stringify(oldState));
        expected.postings = [aPosting];
        expected.postings[0]["id"] = id;

        expect(JSON.parse(JSON.stringify(newState))).toEqual(JSON.parse(JSON.stringify(expected)));
    });

});

describe('Actual Store + reducers, Integration test ASYNCHRONEOUS', () => {

    const aPosting = {
        createdAt: 1, isUnPosted: false,
        linesData: [{ amount: 1234, idu: 0, isDr: true, lineItem: "Cash", lineItemID: 1 },
        { amount: 1234, idu: 1, isDr: false, lineItem: "Loan", lineItemID: 21 }],
        note: 'abc1234', postingDate: 1234, totalAmount: 2468
    };

    it('should set Store value when asyncronous action is dispatched', async () => {

        const oldState = store.getState();
        const id = uuid();
        return store.dispatch(startAddPostingSimulateDelay(aPosting, id))
        .then(() => {
            const newState = store.getState();
            const expected = JSON.parse(JSON.stringify(oldState));
            expected.postings.push(aPosting);
            expected.postings[1]["id"] = id;
            expect(JSON.parse(JSON.stringify(newState))).toEqual(JSON.parse(JSON.stringify(expected)));
        })
        ;
    });

});

