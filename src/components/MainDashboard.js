import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import { connect } from 'react-redux';
import { render } from "react-dom";

import FinStatements from './FinStatements';
import RatioSummary from './RatioSummary';

import { getRatiosData } from "../utils/getRatiosData";
import SimpleBarChart from './ReChartBars';
import ReChartRadialBar from './ReChartRadialBar';
import ReChartPieChart from './ReChartPieChart';
import ReChartStackedBars from './ReChartStackedBars';
import ReChartPieMarket from './ReChartPieMarket';

class MainDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    //const { data } = this.props;
    return (

      <div>
        <SplitterLayout primaryIndex={0} percentage={true} primaryMinSize={60} secondaryInitialSize={30} secondaryMinSize={30}>
          <div>
            <div>
              <div className="row3">
                <div className="column3w">
                  <span className="verIndentFive"></span>
                  <span>market share</span>
                  <ReChartPieMarket />
                </div>
                <div className="column3">
                  <span className="verIndentFive"></span>
                  <span>geographic presence</span>
                  <ReChartPieChart />
                </div>
                <div className="column3">
                  <span className="verIndentFive"></span>
                  <span>monthly KPI status</span>
                  <div style={{ fontSize: 12 }}>
                  <span className="verIndentFive"></span>
                    <span>( <span className="plan">target</span> / <span className="fact">actual</span> )</span><br />
                    <span><span style={{color:'#57d500'}}> &#x25cf;</span>&nbsp;all covenants in compliance: <span className="plan">6</span> / <span className="fact">6</span></span><br />
                    <span><span style={{color:'#57d500'}}> &#x25cf;</span>&nbsp;redeem receivables: <span className="plan">14%</span> / <span className="fact">16.5%</span></span><br />
                    <span><span style={{color:'#57d500'}}> &#x25cf;</span>&nbsp;covenants in compliance: <span className="plan">6</span> / <span className="fact">6</span></span><br />
                    <span><span style={{color:'#57d500'}}> &#x25cf;</span>&nbsp;redeem receivables: <span className="plan">14%</span> / <span className="fact">16.5%</span></span><br />
                    <span><span style={{color:'#57d500'}}> &#x25cf;</span>&nbsp;covenants in compliance: <span className="plan">6</span> / <span className="fact">6</span></span><br />
                    <span><span style={{color:'#57d500'}}> &#x25cf;</span>&nbsp;redeem receivables: <span className="plan">14%</span> / <span className="fact">16.5%</span></span><br />
                    <h1>6 / 6<span style={{ fontSize: 12 }}>&nbsp;&nbsp;= 100% meet</span></h1>
                  </div>
                </div>
              </div>
              <SimpleBarChart
                rawData={this.props.data}
              />
              <ReChartRadialBar />
              <ReChartStackedBars />
              {/*<ReChartRadialBar />
                <ReChartPieMarket />
              <ReChartPieChart />
              <ReChartStackedBars />*/}
            </div>
          </div>
          <div>
            {/*2nd*/}
            <div>
              <RatioSummary
                numberColumnsWidth='80'
                isDataSelectionEnabled='false'
                fontSize='12'
                isFullDateFormat='false'
              />
              <FinStatements
                numberColumnsWidth='80'
                isDataSelectionEnabled='false'
                fontSize='12'
                isFullDateFormat='false'
              />
            </div>
          </div>
        </SplitterLayout>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    postings: state.postings,
    data: getRatiosData(state.postings)
  };
};

export default connect(mapStateToProps)(MainDashboard);

// default export :     - LECTURE 51 - 53
// export default class  OR
// export default MainDashboard;

// export const AddPosting
// export class

// default import
//import PostingsList from './PostingsList';
// named import
// import {PostingsList} from './PostingsList';

// this.setState(()=> {});  this code does not return an empty object, it returns an undefined funtion
    // to make it an objest we need to WRAP in ()
// this.setState(()=> ({}) );   this returns an object  - LECTURE #43

