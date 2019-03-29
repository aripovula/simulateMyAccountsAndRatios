import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
// import checkPropTypes from 'check-prop-types';
import PostingOneLine from '../components/PostingOneLine';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = ( props={}, state=null) => {
    const wrapper = shallow(<PostingOneLine {...props} />);
    if (state) wrapper.setState(state);
    return wrapper;
}

const findAttr = (wrapper, val) => {
    return wrapper.find(`[test-attr="${val}"]`);
}

it('renders without crashing', () => {
    const wrapper = setup();
    // console.log(wrapper.debug());
    expect(wrapper).toBeTruthy();
    const item = findAttr(wrapper, "postingOneLine");
    expect(item.length).toBe(1);
});

it('renders Dr button', () => {
    const wrapper = setup();
    const item = findAttr(wrapper, "DrButton");
    expect(item.length).toBe(1);
});

it('renders text input with line item placeholder', () => {
    const wrapper = setup();
    const item = findAttr(wrapper, "text_input_with_placeholder");
    expect(item.length).toBe(1);
});

it('renders number input with zero value', () => {
    const wrapper = setup();
    const item = findAttr(wrapper, "text_input_with_zero_value");
    expect(item.length).toBe(1);
});
