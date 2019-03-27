import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
// import checkPropTypes from 'check-prop-types';
import PostingForm from '../components/PostingForm';

Enzyme.configure({ adapter: new EnzymeAdapter() })

it('renders without crashing', () => {
    const wrapper = shallow(<PostingForm />)
    // console.log(wrapper.debug());
    expect(wrapper).toBeTruthy();
});
