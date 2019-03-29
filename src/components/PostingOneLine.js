import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import {RemoveLine} from './PostingForm';

let isDr;
export default class PostingOneLine extends React.Component {
  //const PostingOneLine = ({ isDr }) => (

  render() {
    isDr = this.props.isDr;
    return <div test-attr="postingOneLine">
      <span className="horIndent"></span>
      <button
        id={this.props.idu}
        type='button'
        className="button1"
        test-attr="DrButton"
        onClick={this.props.processEntryTypeChange}
      >
        {isDr ? 'Dr' : 'Cr'}
      </button>

      <input
        id={this.props.idu}
        type="text"
        placeholder=" line item"
        test-attr="text_input_with_placeholder"
        className="text-input forLineItem"
        //size="36"
        value={this.props.lineItem}
        onChange={this.props.onLineItemChange}
        autoComplete="off"
      />
      <input
        id={this.props.idu}
        type="number"
        placeholder=" amount, US$"
        test-attr="text_input_with_zero_value"
        className="text-input forNumber"
        //size="16"
        value={'' + (parseFloat(this.props.amount, 10) / 100)}
        onChange={this.props.onAmountChanged}
        autoComplete="off"
      />

      <span className="horIndent"></span>
      <span
        //to="#"
        id={this.props.idu}
        onClick={this.props.processDeleteLine}
        className="noDecor"
      >&#10060;</span>

    </div>
  }
}
