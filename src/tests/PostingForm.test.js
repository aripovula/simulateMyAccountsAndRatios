import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
// import checkPropTypes from 'check-prop-types';
import PostingForm from '../components/PostingForm';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = ( props={}, state=null) => {
    const wrapper = shallow(<PostingForm {...props} />);
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
    const item = findAttr(wrapper, "postingForm");
    expect(item.length).toBe(1);
});

it('renders + Dr line button', () => {
    const wrapper = setup();
    const item = findAttr(wrapper, "plusDrButton");
    expect(item.length).toBe(1);
});

it('renders Description text input', () => {
    const wrapper = setup();
    const item = findAttr(wrapper, "description_input");
    expect(item.length).toBe(1);
});

test('initially state.totalAmount == 0', () => {
    const wrapper = setup();
    const item = wrapper.state("totalAmount");
    expect(item.length).toBe(0);
});

it('adds an object to state.linesData if +DrLine button clicked', () => {
    const linesData = [
        { idu: 0, lineItemID: 0, isDr: true, lineItem: '', amount: 0 },
        { idu: 1, lineItemID: 0, isDr: false, lineItem: '', amount: 0 }
    ];
    const wrapper = setup(null, {linesData});
    const item = findAttr(wrapper, "plusDrButton");
    item.simulate('click');
    wrapper.update();
    const item2 = wrapper.state("linesData");
    expect(item2.length).toBe(3);
});
