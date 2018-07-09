import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { Link } from 'react-router-dom';

import selectPostings from '../selectors/postings';
import { setTextFilter, sortByCreatedDate, sortByPostingDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

class PostingsListFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.clearDateRange = this.clearDateRange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from }, ()=> {
      //console.log('PICKER FROM = ' + this.state.from);
      this.props.dispatch(setStartDate(moment(this.state.from)));
    });
    
  }
  handleToChange(to) {
    this.setState({ to }, () => {
      this.showFromMonth();
      //console.log('PICKER TO = ' + this.state.to);
      this.props.dispatch(setEndDate(moment(this.state.to)));
    });
  }

  clearDateRange = () => {
    this.setState({from: undefined, to: undefined }, () => {
      this.props.dispatch(setStartDate(moment(1)));
      this.props.dispatch(setEndDate(moment(2000000000000)));  
    });
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className="card-4">
        <span className="verIndentFive"></span>
        <div className="boxed">
          <span className="horIndent"></span>
          Sort postings by: &nbsp;
          <select
            value={this.props.filters.sortBy}
            onChange={(e) => {
              if (e.target.value === 'createdDate') {
                this.props.dispatch(sortByCreatedDate());
              } else if (e.target.value === 'postingDate') {
                this.props.dispatch(sortByPostingDate());
              } else if (e.target.value === 'amount') {
                this.props.dispatch(sortByAmount());
              }
            }}
          >
            <option value="createdDate">created date</option>
            <option value="postingDate">posting date</option>
            <option value="amount">amount</option>
          </select>

          <span className="horIndent"></span>
          Text filter:&nbsp;
          <input
            type="text"
            value={this.props.filters.text}
            onChange={(e) => {
              this.props.dispatch(setTextFilter(e.target.value));
            }}
          />
          <div className="InputFromTo">
            <span className="horIndent"></span>
            Date range:
            <span className="horIndent"></span>
            <DayPickerInput
              value={from}
              placeholder="From"
              format="LL"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                toMonth: to,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => this.to.getInput().focus(),
              }}
              onDayChange={this.handleFromChange}
            />{' '}
            —{' '}
            <span className="InputFromTo-to">
              <DayPickerInput
                ref={el => (this.to = el)}
                value={to}
                placeholder="To"
                format="LL"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { before: from },
                  modifiers,
                  month: from,
                  fromMonth: from,
                  numberOfMonths: 2,
                }}
                onDayChange={this.handleToChange}
              />
              <Link to="#" className="addn" onClick={this.clearDateRange}>&nbsp; &nbsp; clear</Link>
            </span>
            <Helmet>
              <style>{`
          .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
            background-color: #f0f8ff !important;
            color: #4a90e2;
          }
          .InputFromTo .DayPicker-Day {
            border-radius: 0 !important;
          }
          .InputFromTo .DayPicker-Day--start {
            border-top-left-radius: 50% !important;
            border-bottom-left-radius: 50% !important;
          }
          .InputFromTo .DayPicker-Day--end {
            border-top-right-radius: 50% !important;
            border-bottom-right-radius: 50% !important;
          }
          .InputFromTo .DayPickerInput-Overlay {
            width: 550px;
          }
          .InputFromTo-to .DayPickerInput-Overlay {
            margin-left: -198px;
          }
          `}
              </style>
            </Helmet>      
          </div>
        </div>
        <span className="verIndentFive"></span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(PostingsListFilter);
