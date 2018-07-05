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
      id = {this.props.idu}
      type = 'button'
      className = "button1"
      onClick = {this.props.processEntryTypeChange}
    >
      {isDr ? 'Dr' : 'Cr'}
    </button>

    <input
      id = {this.props.idu}
      type="text"
      placeholder=" line item"
      className="text-input"
      size="36"
      value={this.props.lineItem}
      onChange={this.props.onLineItemChange}
    />
    <input
      id = {this.props.idu}
      type="number"
      placeholder=" amount, US$"
      className="text-input"
      size="16"
      //value={this.props.amount}
      onChange={this.props.onAmountChanged}
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
