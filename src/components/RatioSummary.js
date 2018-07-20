import React from 'react';
import ReactTable from "react-table";
import { render } from "react-dom";
import { connect } from 'react-redux';
import selectPostings from '../selectors/postings';
import "react-table/react-table.css";

// for Date picker
import moment from 'moment';
import numeral from 'numeral';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

import { Tips } from "../utils/tableUtils";
import { getRatiosData } from "../utils/getRatiosData";

let date = new Date();
let pydate = moment();
let dataPrev;

class RatioSummary extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let pydate = moment('' + (date.getFullYear() - 1) + '-12-31');
    //console.log('pydate=' + pydate.format('MMMM D, YYYY'));

    this.state = {
      //data: getFinData(this.props.postings),
      reportDate: this.props.posting ? moment(this.props.posting.reportDate) : moment(),
      reportDate2: ' pick report date',
      openingDate: this.props.posting ? moment(this.props.posting.openingDate) : pydate,
      openingDate2: ' comparatives date',
      classNameLeft: "left",
      classNameRight: "right",
      classNameCenter: "center",
      numberColumnsWidth: parseInt(this.props.numberColumnsWidth),
      fontSize:parseInt(this.props.fontSize),
      isDataSelectionEnabled: (this.props.isDataSelectionEnabled == 'true'),
      isFullDateFormat: (this.props.isFullDateFormat == 'true')
    };
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
    const { data } = this.props;
    return (
      <div style={{fontSize: this.state.fontSize}}>
        {this.state.isDataSelectionEnabled &&
          <div>

            <span className="horIndent"></span>

            <span>Loan covenant ratios as at:
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
          </div>}
        <ReactTable
          data={data}
          columns={[
            {

              columns: [
                {
                  Header: "Ratio description",
                  id: "ratioDesc",
                  accessor: d => d.ratioDesc,
                  //accessor: "TBLineItems",
                  className: this.state.classNameLeft,
                  Cell: row => (

                    <span>
                      {row.value.isCompliant == true && <span style={{
                        color: '#000000',
                        transition: 'all .3s ease'
                      }}>
                        {row.value.title}
                      </span>}

                      {row.value.isCompliant == false && <span style={{
                        color: '#0bb4e2',
                        transition: 'all .3s ease'
                      }}>
                        {row.value.title}
                      </span>}
                    </span>)
                },
                {
                  Header: "Threshold",
                  id: "MinThreshold",
                  accessor: d => d.ratioMin,
                  className: this.state.classNameCenter,
                  width: this.state.numberColumnsWidth
                },
                {
                  Header: this.state.isFullDateFormat ? this.state.reportDate.format('MMM D, YYYY').toString() : this.state.reportDate.format('MMM D, YY').toString(),
                  id: "CurYear",
                  accessor: d => d.ratio_current,
                  width: this.state.numberColumnsWidth,
                  className: this.state.classNameCenter,
                  Cell: row => (
                    <span>
                      <span style={{
                        color: row.value.isCompliant === false ? '#ff2e00'
                          : row.value.isCompliant === true ? '#57d500'
                            : '#ffbf00',
                        transition: 'all .3s ease'
                      }}>
                        &#x25cf;&nbsp;
                        </span>
                      {numeral(row.value.ratio).format('0.00')}
                    </span>
                  )
                },
                {
                  Header: this.state.isFullDateFormat ? this.state.openingDate.format('MMM D, YYYY').toString() : this.state.openingDate.format('MMM D, YY').toString(),
                  id: "ratio_comparatives",
                  accessor: d => d.ratio_comparatives,
                  width: this.state.numberColumnsWidth,
                  className: this.state.classNameCenter,
                  Cell: row => (
                    <span>
                      <span style={{
                        color: row.value.isCompliantOp === false ? '#ff2e00'
                          : row.value.isCompliantOp === true ? '#57d500'
                            : '#ffbf00',
                        transition: 'all .3s ease'
                      }}>
                        &#x25cf;&nbsp;
                      </span>
                      {numeral(row.value.ratioOp).format('0.00')}
                    </span>
                  )
                },
              ]
            }
          ]}
          showPagination={false}
          defaultPageSize={6}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  console.log('FinStatement mapStateToProps');
  return {
    postings: state.postings,
    data: getRatiosData(state.postings)
  };
};

export default connect(mapStateToProps)(RatioSummary);
