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
import {getFinData, getPYbalances} from "../utils/getFinData";

let date = new Date();
let pydate = moment();
let dataPrev;

class FinStatements extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let pydate = moment('' + (date.getFullYear() - 1) + '-12-31');
    console.log('pydate=' + pydate.format('MMMM D, YYYY'));
    
    this.state = {
      data: getFinData(this.props.postings),
      reportDate: this.props.posting ? moment(this.props.posting.reportDate) : moment(),
      reportDate2: ' pick report date',
      openingDate: this.props.posting ? moment(this.props.posting.openingDate) : pydate,
      openingDate2: ' comparatives date'
    };
    console.log('data prev');
    console.log(dataPrev);
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
    dataPrev = this.state.data != null ? this.state.data : '';
    console.log('postingsInFinStatementUpdated Render top Postings');
    console.log(this.props);
    const { data } = this.state;
    console.log('postingsInFinStatementUpdated Render DATA');
    console.log(data);
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
              id: "percent_change",
              accessor: d => d.percent_change,
              className: "center",
              Cell: row => (
                <span>
                  {parseFloat(row.value, 10) > 0 && <span style={{
                    color: '#57d500',
                    transition: 'all .3s ease'
                  }}>
                    &#9650;
                  </span>}

                  {parseFloat(row.value, 10) == 0 && <span style={{
                    color: '#ffbf00',
                    transition: 'all .3s ease'
                  }}>
                    &#9656;
                  </span>}

                  {parseFloat(row.value, 10) < 0 && <span style={{
                    color: '#ff2e00',
                    transition: 'all .3s ease'
                  }}>
                    &#9660;
                  </span>}

                  {' '+row.value}
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
}

const mapStateToProps = (state) => {
  console.log('postingsInFinStatementUpdated');
  return {
    postings: state.postings,
    data: getFinData(state.postings)
  };
};

export default connect(mapStateToProps)(FinStatements);
