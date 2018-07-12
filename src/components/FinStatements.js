import React from 'react';
import ReactTable from "react-table";
import { render } from "react-dom";
import { connect } from 'react-redux';
import selectPostings from '../selectors/postings';
import "react-table/react-table.css";

// for Date picker
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

import { Tips } from "../utils/tableUtils";

let date = new Date();
//let pydate = 'Dec 31, ' + ( date.getFullYear() - 1);

let pydate = moment();

class FinStatements extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let pydate = moment(''+( date.getFullYear() - 1)+'-12-31');
    console.log('pydate='+pydate.format('MMMM D, YYYY'));
    this.state = {
      data: this.getUData(),
      reportDate: this.props.posting ? moment(this.props.posting.reportDate) : moment(),
      reportDate2: ' pick report date',
      openingDate: this.props.posting ? moment(this.props.posting.openingDate) : pydate,
      openingDate2: ' comparatives date'
    };
    this.getUData = this.getUData.bind(this);
  }

  processReportDateChange(date) {
    this.setState({
      reportDate: moment(date),
      reportDate2: this.state.reportDate2 == ' pick report date' ? 'pick report date' : ' pick report date'
    });
  }

  processOpeningDateChange(date) {
    this.setState({
      openingDate: moment(date),
      openingDate2: this.state.openingDate2 == ' comparatives date' ? 'comparatives date' : ' comparatives date'
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <span className="horIndent"></span>

        <span>Trial Balance as at:
        <span className="horIndent"></span>
          <DayPickerInput
            value={this.state.reportDate2}
            selectedDays={this.state.reportDate}
            format="LL"
            formatDate={formatDate}
            onDayClick={day => this.processReportDateChange(day)}
            onDayChange={day => this.processReportDateChange(day)}
            placeholder="pick report date"
          />
        </span>
        &nbsp;&nbsp;&amp;&nbsp;&nbsp;

          <DayPickerInput
          value={this.state.openingDate2}
          selectedDays={this.state.openingDate}
          format="LL"
          formatDate={formatDate}
          onDayClick={day => this.processOpeningDateChange(day)}
          onDayChange={day => this.processOpeningDateChange(day)}
          placeholder="pick comparatives date"
        />

        <ReactTable
          data={data}
          columns={[
            {

              columns: [
                {
                  Header: "Line items, in US$",
                  accessor: "TBLineItems"
                },
                {
                  Header: this.state.reportDate.format('MMM D, YYYY').toString(),
                  id: "amounts_current",
                  accessor: d => d.amounts_current,
                  className: "right"
                },
                {
                  Header: this.state.openingDate.format('MMM D, YYYY').toString(),
                  id: "amounts_comparatives",
                  accessor: d => d.amounts_comparatives,
                  className: "right"
                }
              ]
            },
            {
              Header: "% change",
              accessor: "status",
              className: "right",
              Cell: row => (
                <span>
                  <span style={{
                    color: row.value === 'relationship' ? '#ff2e00'
                      : row.value === 'complicated' ? '#ffbf00'
                        : '#57d500',
                    transition: 'all .3s ease'
                  }}>
                    &#x25cf;
                  </span> {
                    row.value === 'relationship' ? 'In a relationship'
                      : row.value === 'complicated' ? `It's complicated`
                        : 'Single'
                  }
                </span>)
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
      </div>
    );
  }

  getUData = () => {
    
    let broughtForward = this.getPYbalances();
    let data = [];
    let accum = [];
    let accumOpening = [];

    var mySet = new Set();

    broughtForward.map(lineData => {
      mySet.add(lineData.lineItem);
    });
    
    this.props.postings.map(posting => {
      posting.linesData.map(lineData => {
        mySet.add(lineData.lineItem);
      });
    });

    let LIs = [...mySet];

    broughtForward.map(lineData => {
      for (let x = 0; x < LIs.length; x++) {
        if (LIs[x] == lineData.lineItem) {
          let amt = parseFloat(lineData.amount, 10) / 100;
          if (accum[x] == null) accum[x] = 0;
          if (lineData.isDr) accum[x] = accum[x] + amt;
          if (!lineData.isDr) accum[x] = accum[x] - amt;

          if (accumOpening[x] == null) accumOpening[x] = 0;
          if (lineData.isDr) accumOpening[x] = accumOpening[x] + amt;
          if (!lineData.isDr) accumOpening[x] = accumOpening[x] - amt;
        }
      }
    });

    this.props.postings.map(posting => {
      posting.linesData.map(lineData => {
        for (let x = 0; x < LIs.length; x++) {
          if (LIs[x] == lineData.lineItem) {
            let amt = parseFloat(lineData.amount, 10) / 100;
            if (accum[x] == null) accum[x] = 0;
            if (lineData.isDr) accum[x] = accum[x] + amt;
            if (!lineData.isDr) accum[x] = accum[x] - amt;
          }
        }
      });
    });

    let accs = [];
    for (let x = 0; x < LIs.length; x++) {
      accs[x] = { lineItem: LIs[x], balance: accum[x], openingBalance: accumOpening[x] }
    }
    console.log('accum = ');
    console.log(accum);

    let accounts = this.sortAccounts(accs);

    accounts.map(acc => {
      console.log('acc');
      console.log(acc);
      data.push(
        {
          TBLineItems: acc.lineItem,
          amounts_current: acc.balance != null ? acc.balance.toLocaleString('en-US') : '',
          amounts_comparatives: acc.openingBalance != null ? acc.openingBalance.toLocaleString('en-US'): '',
          percentChanges: 'Current loans',
          status: 223
        }
      );
    });

    return data;
  }

  sortAccounts = (accs) => {
    return accs.sort((a, b) => {
      return a.balance < b.balance ? 1 : -1;
    });
  }

  getPYbalances = () => {
    return [
      {isDr: true, lineItem: 'Cash and equivalents', amount: '322324234'},
      {isDr: true, lineItem: 'Accounts receivable', amount: '46323242'},
      {isDr: true, lineItem: 'Inventory', amount: '46323242'},
      {isDr: true, lineItem: 'Long-term loans', amount: '46323242'},
      {isDr: true, lineItem: 'Short-term loans', amount: '46323242'},
      {isDr: true, lineItem: 'Advance payments', amount: '46323242'},
      {isDr: true, lineItem: 'Other assets', amount: '46323242'},
      {isDr: false, lineItem: 'Accounts payable', amount: '46323242'},
      {isDr: false, lineItem: 'Long-term borrowings', amount: '46323242'},
      {isDr: false, lineItem: 'Short-term borrowings', amount: '46323242'},
      {isDr: false, lineItem: 'Advances received', amount: '46323242'},
      {isDr: false, lineItem: 'Other liabilities', amount: '46323242'},
      {isDr: false, lineItem: 'Share capital', amount: '46323242'},
      {isDr: false, lineItem: 'Retained earnings', amount: '46323242'},
      {isDr: false, lineItem: 'Reserves', amount: '46323242'},
      {isDr: false, lineItem: 'Revenue', amount: '46323242'},
      {isDr: false, lineItem: 'Interest income', amount: '46323242'},
      {isDr: true, lineItem: 'Cost of goods sold', amount: '46323242'},
      {isDr: true, lineItem: 'Admin expenses', amount: '46323242'},
      {isDr: true, lineItem: 'Interest expenses', amount: '46323242'},
      {isDr: true, lineItem: 'Other expenses', amount: '46323242'}
    ];
  }
}

const mapStateToProps = (state) => {
  return {
    postings: state.postings
  };
};

export default connect(mapStateToProps)(FinStatements);
