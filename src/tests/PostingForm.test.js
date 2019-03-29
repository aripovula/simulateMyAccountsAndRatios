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

const findByAttr = (wrapper, val) => {
    return wrapper.find(`[test-attr="${val}"]`);
}

it('renders without crashing', () => {
    const wrapper = setup();
    // console.log(wrapper.debug());
    expect(wrapper).toBeTruthy();
    const item = findByAttr(wrapper, "postingForm");
    expect(item.length).toBe(1);
});

it('renders + Dr line button', () => {
    const wrapper = setup();
    const item = findByAttr(wrapper, "plusDrButton");
    expect(item.length).toBe(1);
});

it('renders Description text input', () => {
    const wrapper = setup();
    const item = findByAttr(wrapper, "description_input");
    expect(item.length).toBe(1);
});

// testing State
test('initially state.totalAmount == 0', () => {
    const wrapper = setup();
    const item = wrapper.state("totalAmount");
    expect(item.length).toBe(0);
});

// testing State and actual display based on state change
it('renders Description text input', () => {
    const note = "Revenue recognition";
    const wrapper = setup(null, {note});
    const inputItem = findByAttr(wrapper, "description_input");
    const stateValue = wrapper.state("note");
    inputItem.simulate('change', { target: { value: 'Revenue recognition' } });
    wrapper.update();
    expect(stateValue).toEqual(note);
    // toEqual version
    expect(inputItem.get(0).props.value).toEqual('Revenue recognition');
    // toContain version
    expect(inputItem.get(0).props.value).toContain('Revenue recognition');
});

// testing State
it('adds an object to state.linesData if +DrLine button clicked', () => {
    const linesData = [
        { idu: 0, lineItemID: 0, isDr: true, lineItem: '', amount: 0 },
        { idu: 1, lineItemID: 0, isDr: false, lineItem: '', amount: 0 }
    ];
    const wrapper = setup(null, {linesData});
    const item = findByAttr(wrapper, "plusDrButton");
    item.simulate('click');
    wrapper.update();
    const item2 = wrapper.state("linesData");
    expect(item2.length).toBe(3);
});

// text is rendered based on these changes, but not on this component.
// hence related unit testing is done in relevant component as shallow test