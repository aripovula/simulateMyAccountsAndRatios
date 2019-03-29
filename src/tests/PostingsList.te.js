import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
// import PropTypes from 'prop-types';
// import checkPropTypes from 'check-prop-types';
import PostingsList from '../components/PostingsList';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = ( props={}, state=null) => {
    const wrapper = shallow(<PostingsList {...props} />);
    if (state) wrapper.setState(state);
    return wrapper;
}

const findAttr = (wrapper, val) => {
    return wrapper.find(`[test-attr="${val}"]`);
}

it('renders without crashing', () => {
    const wrapper = setup();
    console.log(wrapper.debug());
    expect(wrapper).toBeTruthy();
    const item = findAttr(wrapper, "postingsList");
    expect(item.length).toBe(1);
});
