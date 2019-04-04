import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import PostingsList, { PostingsList as PostingsListUnconctd } from '../components/PostingsList'; 
import { Provider } from 'react-redux'
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
    return wrapper;
}

const findByAttr = (wrapper, val) => {
    return wrapper.find(`[test-attr="${val}"]`);
}

describe('Connected, shallow, test renders', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = setup();
    })

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
        const item = findByAttr(wrapper, "postingsList");
        expect(item.length).toBe(1);
    });
})
