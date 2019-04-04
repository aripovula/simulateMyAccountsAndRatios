import React from 'react';
import uuid from 'uuid';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import PostingsList, { PostingsList as PostingsListUnconctd } from '../components/PostingsList'; 
// import configureStore from 'redux-mock-store'
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux'
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory} from 'history';
export const history = createBrowserHistory();

import { addPosting, editPosting, removePosting } from '../actions/postings';
import { createStore, applyMiddleware } from 'redux';

import postingsReducers from '../reducers/postings';
import combinedReducers, { middlewares } from '../store/configureStore';
import { startAddDummy } from '../actions/dummy';

const store = configureStore();
console.log(store.getState());


// const storeFactory = (initialState) => {
//     const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
//     return createStoreWithMiddleware(combinedReducers, initialState);
// };

// const setup = ( props={}, initialState={}) => {
//     // store = storeFactory(initialState);
//     const wrapper = shallow(<PostingsList store={store} />).dive();
//     // console.log(wrapper.debug());
//     return wrapper;
// }

const dummyObj = { dummy: 'test12' }

const findByAttr = (wrapper, val) => {
    return wrapper.find(`[test-attr="${val}"]`);
}

describe('Actual Store + reducers, Integration test', () => {

    const initialState = { dummyObj }
    // const mockStore = configureStore();
    // let store;
    let wrapper;

    // beforeEach(() => {
    //     // store = createStore(combinedReducers);
    //     // wrapper = setup(null, initialState);
    //     // console.log(wrapper.debug());
    // })


    // it('renders connected component without crashing', () => {
    //     expect(wrapper).toBeTruthy();
    //     const item = findByAttr(wrapper, "postingsList");
    //     expect(wrapper.length).toBe(1);
    // });

    it('gets props that match with initialState', async () => {
        
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


