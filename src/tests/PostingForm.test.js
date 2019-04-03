import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
// import checkPropTypes from 'check-prop-types';
import PostingForm from '../components/PostingForm';

// use describe + beforeEach in lectures 41 + 42

const setup = (props = {}, state = null) => {
    const wrapper = shallow(<PostingForm {...props} />);
    if (state) wrapper.setState(state);
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

const postings = [aPosting, JSON.parse(JSON.stringify(aPosting)), JSON.parse(JSON.stringify(aPosting))];
postings[0].note = 'xyz1234';
postings[2].note = 'opr1234';

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
    const wrapper = setup(null, { note });
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
    const wrapper = setup(null, { linesData });
    const item = findByAttr(wrapper, "plusDrButton");
    item.simulate('click');
    wrapper.update();
    const item2 = wrapper.state("linesData");
    expect(item2.length).toBe(3);
});

// text is rendered based on these changes, but not on this component.
// hence related unit testing is done in relevant component as shallow test

it('render error message - data not input correctly', () => {
    const wrapper = setup();
    const form = findByAttr(wrapper, "postingForm");
    form.simulate('submit', {
        preventDefault: () => { }
    });
    // wrapper.update();
    const item = findByAttr(wrapper, "errorMsg");
    expect(item.text()).toContain('add amounts');
    // expect(wrapper).toContain('add amounts');
});

it('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<PostingForm posting={postings[0]} onSubmit={onSubmitSpy} />);
    const form = findByAttr(wrapper, "postingForm");
    form.simulate('submit', {
        preventDefault: () => { }
    });
    // console.log('-s-', wrapper.debug());
    // const item = findByAttr(wrapper, "errorMsg");
    // wrapper.update();
    // expect(wrapper.).not.toContain('add amounts');
    const item = findByAttr(wrapper, "errorMsg");
    expect(item.text()).not.toContain('add amounts');
    expect(onSubmitSpy).toHaveBeenLastCalledWith(postings[0]);
});
