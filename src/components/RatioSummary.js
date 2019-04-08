import React from 'react';
import ReactTable from "react-table";
import { render } from "react-dom";
import { connect } from 'react-redux';
import "react-table/react-table.css";

// for Date picker
import moment from 'moment';
import numeral from 'numeral';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { disabledDays } from 'react-day-picker';
import { formatDate, parseDate } from 'react-day-picker/moment';
import Helmet from 'react-helmet';
// local imports
import { selectRatioData } from '../selectors/ratioData';
import { Tips } from "../utils/tableUtils";
import { setStartDate, setEndDate } from '../actions/filters';

let date = new Date();
const pydate = moment().subtract(1, 'years').endOf('year');
let dataPrev;

class RatioSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportDate2: ' pick report date',
      classNameLeft: "left",
      classNameRight: "right",
      classNameCenter: "center",
      numberColumnsWidth: parseInt(this.props.numberColumnsWidth),
      fontSize: parseInt(this.props.fontSize),
      isFullDateFormat: (this.props.isFullDateFormat == 'true'),
      cColor: (this.props.isFullDateFormat == 'true') ? '' : '#FF8042'
    };
  }

  processReportDateChange(date, modifiers = {}) {
    // console.log('modifiers.disabled = ' + modifiers.disabled);
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      reportDate2: this.state.reportDate2 == ' pick report date' ? 'pick report date' : ' pick report date'
    }, () => {
      this.props.dispatch(setEndDate(moment(date)));
      this.props.dispatch(setStartDate(moment(pydate)));
    });
  }

  render() {
    const data = this.props.ratioData;
    return (
      <div style={{ fontSize: this.state.fontSize }}>

        <div>

          <span className="horIndent"></span>

          <span style={{ color: this.state.cColor }}>
            {this.state.isFullDateFormat ? 'Change reporting date to:' : 'Update info for date of :'}
            <span className="horIndent"></span>
            <span className="InputFromTo-to">
            <DayPickerInput
              value={this.state.reportDate2}
              selectedDays={pydate.toDate()}
              format="LL"
              formatDate={formatDate}
              onDayClick={day => this.processReportDateChange(day)}
              onDayChange={day => this.processReportDateChange(day)}
              placeholder="pick report date"
              dayPickerProps={{
                numberOfMonths: 3,
                enableOutsideDays: false,
                disabledDays: {
                  before: pydate.toDate(),
                  after: date,
                }
              }}
            />
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
                  margin-left: -40px;
                }
                `}
              </style>
            </Helmet>
          </span>
        </div>
        <ReactTable
          data={data}
          columns={[
            {

              columns: [
                {
                  Header: "Ratio description",
                  id: "ratioDesc",
                  accessor: d => d.ratioDesc,
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
                  Header: this.props.filters.endDate ? (this.state.isFullDateFormat ? this.props.filters.endDate.format('MMM D, YYYY').toString() : this.props.filters.endDate.format('MMM D, YY').toString()) : '',
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
                  Header: this.state.isFullDateFormat ? pydate.format('MMM D, YYYY').toString() : pydate.format('MMM D, YY').toString(),
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
  return {
    ratioData: selectRatioData(state),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(RatioSummary);
