import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import checkPropTypes from 'check-prop-types';
import PostingOneLine from '../components/PostingOneLine';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {isDr: true};

const setup = ( props={}, state=null) => {
    const setupProps = { ...defaultProps, ...props}
    const wrapper = shallow(<PostingOneLine {...setupProps} />);
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
    const item = findByAttr(wrapper, "postingOneLine");
    expect(item.length).toBe(1);
});

it('renders Dr button if props.isDr is true', () => {
    const wrapper = setup({isDr: true}, null);
    const item = findByAttr(wrapper, "DrButton");
    const wrapperText = wrapper.text();
    const wrapperText2 = wrapper.debug().replace(/(?:\r\n|\r|\n|\s)/g, '');
    // console.log(wrapperText2);
    expect(wrapperText).toContain('Dr');
    expect(wrapperText2).toContain('>Dr</button>');
});

it('renders Cr button if props.isDr is false', () => {
    const wrapper = setup({isDr: false}, null);
    const item = findByAttr(wrapper, "DrButton");
    const wrapperText = wrapper.text();
    const wrapperText2 = wrapper.debug().replace(/(?:\r\n|\r|\n|\s)/g, '');
    // console.log(wrapperText2);
    expect(wrapperText).toContain('Cr');
    expect(wrapperText2).toContain('>Cr</button>');
});

it('renders Dr or Cr button', () => {
    const wrapper = setup();
    const item = findByAttr(wrapper, "DrButton");
    expect(item.length).toBe(1);
});

it('renders text input with line item placeholder', () => {
    const wrapper = setup();
    const item = findByAttr(wrapper, "text_input_with_placeholder");
    expect(item.length).toBe(1);
});

it('renders number input with zero value', () => {
    const wrapper = setup();
    const item = findByAttr(wrapper, "text_input_with_zero_value");
    expect(item.length).toBe(1);
});

it('checks if prop types are correct', () => {
    const wrapper = setup({isDr: true});
    const expectedProp = {isDr: true}
    const propError = checkPropTypes(PostingOneLine.propTypes, expectedProp, 'prop', PostingOneLine.name);
    // const item = findByAttr(wrapper, "text_input_with_zero_value");
    expect(propError).toBeUndefined();
});
