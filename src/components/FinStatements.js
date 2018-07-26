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
import { getFinData, getPYbalances } from "../utils/getFinData";
import { setStartDate, setEndDate } from '../actions/filters';

let date = new Date();
const pydate = moment('' + (date.getFullYear() - 1) + '-12-31');
let dataPrev;

class FinStatements extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setStartDate(moment(pydate)));
    this.props.dispatch(setEndDate(moment()));
    this.state = {
      reportDate2: ' pick report date',
      classNameLeft: "left",
      classNameRight: "right",
      classNameCenter: "center",
      numberColumnsWidth: parseInt(this.props.numberColumnsWidth),
      fontSize:parseInt(this.props.fontSize),
      isDataSelectionEnabled: (this.props.isDataSelectionEnabled == 'true'),
      isFullDateFormat: (this.props.isFullDateFormat == 'true')
    };
    //{this.props.dispatch(setEndDate(moment()))}
  }

  processReportDateChange(date) {
    this.setState({
      reportDate2: this.state.reportDate2 == ' pick report date' ? 'pick report date' : ' pick report date'
    }, ()=>{
      this.props.dispatch(setEndDate(moment(date)));
      this.props.dispatch(setStartDate(moment(pydate)));
    });
  }

  // componentDidMount = () => {
  //   this.props.dispatch(setEndDate(moment()));
  // }

  render() {
    const dataTemp = getFinData(this.props.postings);
    console.log('postingsInFinStatementUpdated Render DATA');
    console.log(this.props);
    // console.log('data prev');
    // console.log(dataPrev);
    // console.log('BEFORE CallinG findUpdatedOnes');
    const data = dataPrev != null ? this.findUpdatedOnes(dataTemp, dataPrev) : dataTemp;
    dataPrev = dataTemp;
    return (
      <div style={{fontSize: this.state.fontSize}}>
        {this.state.isDataSelectionEnabled &&
          <div>
            <span className="horIndent"></span>

            <span>Change reporting date to:
            <span className="horIndent"></span>
              <DayPickerInput
                value={this.state.reportDate2}
                selectedDays={this.props.filters.endDate}
                format="LL"
                formatDate={formatDate}
                onDayClick={day => this.processReportDateChange(day)}
                onDayChange={day => this.processReportDateChange(day)}
                placeholder="pick report date"
                dayPickerProps={{
                  enableOutsideDays: false,
                  disabledDays: {
                    before: pydate.toDate(),
                    after: date,
                  }
                }}
  
              />
            </span>
          </div>}

        <ReactTable
          data={data}
          columns={[
            {

              columns: [
                {
                  Header: "Trial Balance items, in US$",
                  id: "TBLineItems",
                  accessor: d => d.TBLineItems,
                  //accessor: "TBLineItems",
                  className: this.state.classNameLeft,
                  Cell: row => (

                    <span>
                      {row.value.isUpdated == false && <span style={{
                        color: '#000000',
                        transition: 'all .3s ease'
                      }}>
                        {row.value.lineItem}
                      </span>}

                      {row.value.isUpdated == true && <span style={{
                        color: '#0bb4e2',
                        transition: 'all .3s ease'
                      }}>
                        {row.value.lineItem}
                      </span>}
                    </span>)
                },
                {
                  Header: this.props.filters.endDate ? (this.state.isFullDateFormat ? this.props.filters.endDate.format('MMM D, YYYY').toString() : this.props.filters.endDate.format('MMM D, YY').toString()) : '' ,
                  id: "amounts_current",
                  accessor: d => d.amounts_current,
                  width: this.state.numberColumnsWidth,
                  className: this.state.classNameRight,
                  Cell: row => (
                    <span>
                      {row.value.isUpdated == false && <span style={{
                        color: '#000000',
                        transition: 'all .3s ease'
                      }}>
                        {row.value.balance}
                      </span>}

                      {row.value.isUpdated == true && <span style={{
                        color: '#0bb4e2',
                        transition: 'all .3s ease'
                      }}>
                        {row.value.balance}
                      </span>}
                    </span>)

                },
                {
                  Header: this.state.isFullDateFormat ? pydate.format('MMM D, YYYY').toString() : pydate.format('MMM D, YY').toString(),
                  id: "amounts_comparatives",
                  accessor: d => d.amounts_comparatives,
                  width: this.state.numberColumnsWidth,
                  className: this.state.classNameRight,
                  Cell: row => (

                    <span>
                      {row.value.isUpdated == false && <span style={{
                        color: '#000000',
                        transition: 'all .3s ease'
                      }}>
                        {row.value.openingBalance}
                      </span>}

                      {row.value.isUpdated == true && <span style={{
                        color: '#0bb4e2',
                        transition: 'all .3s ease'
                      }}>
                        {row.value.openingBalance}
                      </span>}
                    </span>)

                }
              ]
            },
            {
              Header: "% change",
              id: "percent_change",
              accessor: d => d.percent_change,
              className: this.state.classNameCenter,
              width: this.state.numberColumnsWidth,
              Cell: row => (

                <span>
                  {row.value.arrowType == 2 && <span style={{
                    color: '#57d500',
                    transition: 'all .3s ease'
                  }}>
                    &#9650;
                  </span>}

                  {row.value.arrowType == 1 && <span style={{
                    color: '#ff2e00',
                    transition: 'all .3s ease'
                  }}>
                    &#9650;
                  </span>}

                  {row.value.arrowType == 0 && <span style={{
                    color: '#ffbf00',
                    transition: 'all .3s ease'
                  }}>
                    &#9656;
                  </span>}

                  {row.value.arrowType == -1 && <span style={{
                    color: '#ff2e00',
                    transition: 'all .3s ease'
                  }}>
                    &#9660;
                  </span>}

                  {row.value.arrowType == -2 && <span style={{
                    color: '#57d500',
                    transition: 'all .3s ease'
                  }}>
                    &#9660;
                  </span>}

                  {' ' + numeral(row.value.percentChange).format('0.00%')}
                </span>)
            }
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
        <Tips />
      </div>
    );
  }

  findUpdatedOnes = (dataTemp, dataPrev) => {
    // console.log('findUpdatedOnes dataTemp='+dataTemp.length+' dataPrev='+dataPrev.length);
    // console.log(dataTemp);
    if (dataTemp != null && dataPrev != null) {
      // console.log('findUpdatedOnes 2');
      for (let x = 0; x < dataTemp.length; x++) {
        let tempItem = dataTemp[x];
        // console.log('tempItem');
        // console.log(tempItem);
        //for (let y = 0; y < dataPrev.length; y++) {
        let y = tempItem.TBLineItemsID - 1;
        // console.log(y);
        let prevItem = dataPrev[y];
        // console.log(tempItem.TBLineItems.lineItem + ' - ' + prevItem.TBLineItems.lineItem);
        if (tempItem.TBLineItems.lineItem === prevItem.TBLineItems.lineItem) {
          //console.log(tempItem.amounts_current.balance+ ' - '+ prevItem.amounts_current.balance);
          if (tempItem.amounts_current.balance != prevItem.amounts_current.balance) {
            dataTemp[x].TBLineItems.isUpdated = true;
            dataTemp[x].amounts_current.isUpdated = true;
            dataTemp[x].amounts_comparatives.isUpdated = true;
          }
          //y = dataPrev.length;
        }
        //}
      }
    }
    //console.log('dataTemp');
    //console.log(dataTemp);
    return dataTemp;
  }
}

const mapStateToProps = (state) => {
  return {
    postings: selectPostings(state.postings, state.filters),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(FinStatements);
