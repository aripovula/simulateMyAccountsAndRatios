import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import PostingsList, { PostingsList as PostingsListUnconctd } from '../components/PostingsList'; 
// import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory} from 'history';
export const history = createBrowserHistory();

import { addPosting, editPosting, removePosting } from '../actions/postings';
import { createStore, applyMiddleware } from 'redux';

import postingsReducers from '../reducers/postings';
import combinedReducers, { middlewares } from '../store/configureStore';
import { startAddPosting } from '../actions/postings';


const storeFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(combinedReducers, initialState);
};

const setup = ( props={}, initialState={}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<PostingsList {...props} store={store} />).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

const setupWihoutDive = (props = {}, initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<PostingsList {...props} store={store} />);
    console.log(wrapper.debug());
    return wrapper;
}

const findByAttr = (wrapper, val) => {
    return wrapper.find(`[test-attr="${val}"]`);
}

const aPosting = {
    createdAt: 1, isUnPosted: false,
    linesData: [{ amount: 1234, idu: 0, isDr: true, lineItem: "Cash", lineItemID: 1 },
    { amount: 1234, idu: 1, isDr: false, lineItem: "Loan", lineItemID: 21 }],
    note: 'abc1234', postingDate: 1234, totalAmount: 2468
};

describe('Connected, shallow, test renders', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = setup();
        // console.log(wrapper.debug());
    })

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
        const item = findByAttr(wrapper, "postingsList");
        // wrapper.update();
        // console.log(wrapper.debug());
        expect(item.length).toBe(1);
    });
})


// describe('Connected, shallow, pass the initialState', () => {

//     const initialState = { postings: [], separateLines: [] }
//     let wrapper;

//     beforeEach(() => {
//         wrapper = setup(null, initialState);
//     })

//     it('renders connected component without crashing', () => {
//         expect(wrapper).toBeTruthy();
//         const item = findByAttr(wrapper, "notFound");
//         expect(item.length).toBe(1);
//     });

// })
