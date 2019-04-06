import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import {RemoveLine} from './PostingForm';

let isDr;
const PostingOneLine = (props) => {
  //const PostingOneLine = ({ isDr }) => (

  // render() {
    isDr = props.isDr;
    return <div test-attr="postingOneLine">
      <span className="horIndent"></span>
      <button
        id={props.idu}
        type='button'
        className="button1"
        test-attr="DrButton"
        onClick={props.processEntryTypeChange}
      >
        {isDr ? 'Dr' : 'Cr'}
      </button>

      <input
        id={props.idu}
        type="text"
        placeholder=" line item"
        test-attr="text_input_with_placeholder"
        className="text-input forLineItem"
        //size="36"
        value={props.lineItem}
        onChange={props.onLineItemChange}
        autoComplete="off"
      />
      <input
        id={props.idu}
        type="number"
        placeholder=" amount, US$"
        test-attr="text_input_with_zero_value"
        className="text-input forNumber"
        //size="16"
        value={'' + (parseFloat(props.amount, 10) / 100)}
        onChange={props.onAmountChanged}
        autoComplete="off"
      />

      <span className="horIndent"></span>
      <span
        //to="#"
        id={props.idu}
        test-attr="deleteLineX"
        onClick={props.processDeleteLine}
        className="noDecor"
      >&#10060;</span>

    </div>
  // }
}

PostingOneLine.propTypes = { isDr: PropTypes.bool.isRequired };

export default PostingOneLine;
