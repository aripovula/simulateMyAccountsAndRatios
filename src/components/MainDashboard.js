import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import { connect } from 'react-redux';
import { render } from "react-dom";

import FinStatements from './FinStatements';
import RatioSummary from './RatioSummary';

import { getRatiosData } from "../utils/getRatiosData";
import ReChartLineBench from './ReChartLineBench';
import ReChartBarsRatio from './ReChartBarsRatio';
//import ReChartRadialBar from './ReChartRadialBar';
import ReChartPieChart from './ReChartPieChart';
// import ReChartStackBarAL from './ReChartStackedBars';
// import ReChartStackBarEL from './ReChartStackedBars';
// import ReChartPieMarket from './ReChartPieMarket';
import DashboardLineOne from './DashboardLineOne';
import DashboardLineTwo from './DashboardLineTwo';
import DashboardLineThree from './DashboardLineThree';

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
            <DashboardLineOne />
            <div className="weeklysales">
              <span className="verIndent"></span>
              <span className="dtitle">weekly sales</span>
              <ReChartLineBench
                rawData={this.props.data}
              />
            </div>
            <span className="verIndent"></span>
            <span className="horrIndent"></span>
            <div className="center">
              <span style={{ color: '#0088FE', fontSize: '14px' }}>competitor benchmarking &nbsp; &nbsp;( &nbsp; </span>
              <span style={{ color: '#82ca9d', fontSize: '20px' }}> &#x7E;</span>
              <span style={{ color: '#82ca9d', fontSize: '14px' }}> &nbsp;benchmark - market,  &nbsp; &nbsp; &nbsp;</span>
              <span style={{ color: '#8884d8', fontSize: '20px' }}> &#x7E;</span>
              <span style={{ color: '#8884d8', fontSize: '14px' }}> &nbsp;our group &nbsp; </span>
              <span style={{ color: '#0088FE', fontSize: '14px' }}>)</span>
            </div>
            <DashboardLineTwo />
            <DashboardLineThree />
            <div className="benchmark">
              <span className="verIndentFive"></span>
              <div className="center">
                <span className="dtitle">covenant compliance</span>
              </div>
              <ReChartBarsRatio
                rawData={this.props.data}
              />
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