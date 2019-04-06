import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import PostingForm from '../components/PostingForm';

const findByAttr = (wrapper, val) => {
    return wrapper.find(`[test-attr="${val}"]`);
}

describe('mounted PostingForm, with SPIES', () => {
    let wrapper;
    beforeEach(() => wrapper = mount(<PostingForm />));

    it('calls processAddDrLine when a + Dr line key is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'processAddDrLine');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        const item = findByAttr(wrapper, "plusDrButton");
        item.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('checks if only 2 line items are shown before add simulation', () => {
        const item2 = findByAttr(wrapper, "text_input_with_placeholder");
        expect(item2.length).toBe(2);
    });

    it('calls processAddCrLine when a + Cr line key is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'processAddCrLine');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        const item = findByAttr(wrapper, "plusCrButton");
        item.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);

        const item2 = findByAttr(wrapper, "text_input_with_placeholder");
        expect(item2.length).toBe(3);
    });

    it('checks if due functions is called / line item is removed when deleteLineX is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'processDeleteLine');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        let items = findByAttr(wrapper, "deleteLineX");
        let item = items.first();
        expect(items.length).toBe(2);
        item.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
        items = findByAttr(wrapper, "deleteLineX");
        expect(items.length).toBe(1);
    });

    it('calls onSubmit when a sumbit key is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'onSubmit');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        const item = findByAttr(wrapper, "postingForm");
        item.simulate('submit');
        expect(spy).toHaveBeenCalledTimes(1);
    });

});