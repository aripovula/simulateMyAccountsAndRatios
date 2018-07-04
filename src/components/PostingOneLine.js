import React from 'react';
import { connect } from 'react-redux';
// import {RemoveLine} from './PostingForm';

let isDr;
export default class PostingOneLine extends React.Component {
//const PostingOneLine = ({ isDr }) => (

  
render () {
  isDr = this.props.isDr;
  return <div>
    <span className="horIndent"></span>
    <button
      type='button'
      className="button1"
      onClick={this.onTypeChange}
    >
      {isDr ? 'Dr' : 'Cr'}
    </button>

    <input
      type="text"
      placeholder=" line item"
      className="text-input"
      size="36"
      //value={this.state.lineItem}
      onChange={this.onLineItemChange}
    />
    <input
      type="text"
      placeholder=" amount, US$"
      className="text-input"
      size="16"
      //value={this.state.amount}
      onChange={this.onAmountChange}
    />

    <span className="horIndent"></span>
    <span 
    id = {this.props.idu}
    className="glyphicon glyphicon-remove"
    onClick={this.props.processDeleteLine}
    ></span>
  </div>
}
}
