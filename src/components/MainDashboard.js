import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import { render } from "react-dom";
import { connect } from 'react-redux';

import FinStatements from './FinStatements';
import RatioSummary from './RatioSummary';

import ReChartLineSales from './ReChartLineSales';
import ReChartBarsRatio from './ReChartBarsRatio';
import ReChartPieChart from './ReChartPieChart';
import DashboardLineOne from './DashboardLineOne';
import DashboardLineTwo from './DashboardLineTwo';
import DashboardLineThree from './DashboardLineThree';
import { selectPostings } from '../selectors/postings';
import addSimulatedEntries from '../utils/addSimulatedEntries';
import LoadingModal from './LoadingModal';
import LoadFailedModal from './LoadFailedModal';

let isRestored = false;

class MainDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainText: undefined,
      mainTextFail: undefined,
      shortText: undefined
    }
  }

  startRestoreDefaults = () => {
    this.setState(() => ({
      shortText: 'In process ...',
      mainText: "Loading app related DATA. Please wait"
    }));
    isRestored = false;
    setTimeout(this.restoreTimedOut, 8 * 1000);
    addSimulatedEntries(this.props);
  }

  restoreTimedOut = () => {
    if (!isRestored) {
      this.setState(() => ({
        mainText: undefined,
        mainTextFail: 'Data loading failed. Please check your INTERNET connection !'
      }));
    }
  }

  componentWillMount = () => {
    console.log('DASH lenGTH = ' + this.props.postings.length);
    if (this.props.postings.length == 0) this.startRestoreDefaults();
  }

  componentWillReceiveProps = () => {
    this.setState(() => ({
      shortText: undefined,
      mainText: undefined,
      mainTextFail: undefined
    }));
    isRestored = true;
  }

  render() {
    return (
      <div className="margintop">
        <LoadingModal
          mainText={this.state.mainText}
          shortText={this.state.shortText}
        />
        <LoadFailedModal
          mainTextFail={this.state.mainTextFail}
          shortText={this.state.shortText}
        />
        <SplitterLayout primaryIndex={0} percentage={true} primaryMinSize={60} secondaryInitialSize={30} secondaryMinSize={30}>
          <div>
            <DashboardLineOne />
            <div className="weeklysales">
              <span className="verIndent"></span>
              <div className="center">
                <span style={{ color: '#0088FE', fontSize: '14px' }}>monthly sales trend, in US$ &nbsp; &nbsp;( &nbsp; </span>
                <span style={{ color: '#82ca9d', fontSize: '20px' }}> &#x7E;</span>
                <span style={{ color: '#82ca9d', fontSize: '14px' }}> &nbsp;target volume,  &nbsp; &nbsp; &nbsp;</span>
                <span style={{ color: '#8884d8', fontSize: '20px' }}> &#x7E;</span>
                <span style={{ color: '#8884d8', fontSize: '14px' }}> &nbsp;actual volume &nbsp; </span>
                <span style={{ color: '#0088FE', fontSize: '14px' }}>)</span>
              </div>

              <ReChartLineSales />
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
    postings: selectPostings(state)
  };
};

export default connect(mapStateToProps)(MainDashboard);
