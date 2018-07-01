import React from 'react';
import moment from 'moment';
//import { SingleDatePicker } from 'react-dates/initialize';

let isDr = true;

export default class PostingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       ptype: props.posting ? props.posting.ptype : '',
        lineItem: props.posting ? props.posting.lineItem : '',
        note: props.expense ? props.expense.note : '',
        amount: props.expense ? (props.expense.amount / 100).toString() : '',
        //createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
        //calendarFocused: false,
        error: ''
    };
  }
  onTypeChange = (e) => {
    isDr = !isDr;
    const ptype = isDr ? 'Dr' : 'Cr';
    this.setState(() => ({ ptype }));
  };
  onLineItemChange = (e) => {
    const lineItem = e.target.value;
    this.setState(() => ({ lineItem }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
//   onDateChange = (createdAt) => {
//     if (createdAt) {
//       this.setState(() => ({ createdAt }));
//     }
//   };
//   onFocusChange = ({ focused }) => {
//     this.setState(() => ({ calendarFocused: focused }));
//   };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.lineItem || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide line item and amount.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        ptype: this.state.ptype,
        lineItem: this.state.lineItem,
        amount: parseFloat(this.state.amount, 10) * 100,
        // createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
       <form className="form" onSubmit={this.onSubmit}>
         {this.state.error && <p className="form__error">{this.state.error}</p>}
        
        <span className="horIndent"></span>

       {/*<select>
          <option value="dr" >Dr</option>
          <option value="cr" >Cr</option>
          value={this.state.ptype}
          onChange={this.onTypeChange}
         </select>*/}

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
            value={this.state.lineItem}
            onChange={this.onLineItemChange}
        />
         <input
          type="text"
          placeholder=" amount, US$"
          className="text-input"
          size="16"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        {/*<SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />*/}
        <div>
          <span className="verIndent"></span>
            <span className="horIndent"></span>
            <button  className="button1">+ Dr line</button>
            <span className="horIndent"></span>
            <button  className="button2">+ Cr line</button>
            <span className="verIndent"></span>
            <span className="horIndent"></span>
            <input
            type="text"
              placeholder="Comment (optional)"
              size="60"
              className="text-input"
              value={this.state.note}
              onChange={this.onNoteChange}
            />
            <span className="verIndent"></span>
            <span className="horIndent"></span>
            <button className="button1">Post Entry</button>
        </div>
      </form>
    )
  }
}
