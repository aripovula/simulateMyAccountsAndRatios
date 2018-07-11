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

let postingDate;
let openingDate;

class FinStatements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getUData(),
      reportDate: this.props.posting ? moment(this.props.posting.reportDate) : moment(),
      reportDate2: ' pick report date',
      openingDate: this.props.posting ? moment(this.props.posting.openingDate) : moment(),
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
            selectedDays={this.state.reportDate2}
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
          selectedDays={this.state.openingDate2}
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
                  Header: "Line items",
                  accessor: "assets"
                },
                {
                  Header: this.state.reportDate.format('MMM D, YYYY').toString(),
                  id: "amounts_assets",
                  accessor: d => d.amounts_assets,
                  className: "right"
                },
                {
                  Header: this.state.openingDate.format('MMM D, YYYY').toString(),
                  id: "amounts_assets",
                  accessor: d => d.amounts_assets,
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
    let data = [];
    let accum = [];

    var mySet = new Set();

    this.props.postings.map(posting => {
      posting.linesData.map(lineData => {
        mySet.add(lineData.lineItem);
      });
    });

    let LIs = [...mySet];

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
      accs[x] = { lineItem: LIs[x], balance: accum[x] }
    }
    console.log('accum = ');
    console.log(accum);

    let accounts = this.sortAccounts(accs);

    accounts.map(acc => {
      //console.log('')
      data.push(
        {
          assets: acc.lineItem,
          amounts_assets: acc.balance.toLocaleString('en-US'),
          liabilities: 'Current loans',
          amounts_liabs: 22,
          visits: 33,
          progress: 33,
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
}

const mapStateToProps = (state) => {
  return {
    postings: state.postings
  };
};

export default connect(mapStateToProps)(FinStatements);
