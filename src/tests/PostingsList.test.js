import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import PostingsList, { PostingsList as PostingsListUnconctd } from '../components/PostingsList'; 
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory} from 'history';
export const history = createBrowserHistory();

import { addPosting, editPosting, removePosting } from '../actions/postings';
import { createStore } from 'redux';
import postingsReducers from '../reducers/postings';
import combinedReducers from '../store/configureStore';
import { startAddPosting } from '../actions/postings';

const findByAttr = (wrapper, val) => {
    return wrapper.find(`[test-attr="${val}"]`);
}

const aPosting = {
    createdAt: 1, isUnPosted: false,
    linesData: [{ amount: 1234, idu: 0, isDr: true, lineItem: "Cash", lineItemID: 1 },
    { amount: 1234, idu: 1, isDr: false, lineItem: "Loan", lineItemID: 21 }],
    note: 'abc1234', postingDate: 1234, totalAmount: 2468
};

describe('Unconnected, shallow, test renders', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<PostingsListUnconctd />);
    })

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
        const item = findByAttr(wrapper, "postingsList");
        expect(item.length).toBe(1);
    });
})


describe('Connected, shallow, pass the store directly', () => {

    const initialState = { postings: [aPosting] }
    const mockStore = configureStore();
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(<PostingsList store={store} />);
    })

    it('renders connected component without crashing', () => {
        expect(wrapper).toBeTruthy();
        const item = findByAttr(wrapper, "postingsList");
        expect(wrapper.length).toBe(1);
    });

    it('gets props that match with initialState', () => {
        expect(wrapper.prop('postings')).toEqual(initialState.postings);
    });

})

describe('Connected, mount + wrapping in <Provider>', () => {

    const initialState = { postings: [aPosting] }
    const mockStore = configureStore();
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <PostingsList/>
                </Router>
            </Provider>
        );
        // console.log(wrapper.debug());
    })

    it('renders connected component without crashing', () => {
        expect(wrapper).toBeTruthy();
        const item = findByAttr(wrapper, "postingsList");
        expect(wrapper.length).toBe(1);
    });

    it('gets props that match with initialState', () => {
        expect(wrapper.find(PostingsListUnconctd).prop('postings')).toEqual(initialState.postings);
    });

})


describe('Actual Store + reducers', () => {

    const initialState = { postings: [aPosting] }
    // const mockStore = configureStore();
    let store;
    let wrapper;

    beforeEach(() => {
        store = createStore(combinedReducers);
        wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <PostingsList />
                </Router>
            </Provider>
        );
        // console.log(wrapper.debug());
    })


    it('renders connected component without crashing', () => {
        expect(wrapper).toBeTruthy();
        const item = findByAttr(wrapper, "postingsList");
        expect(wrapper.length).toBe(1);
    });

})
