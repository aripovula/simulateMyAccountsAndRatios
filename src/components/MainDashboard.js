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
import DashboardPies from './DashboardPies';

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
          <DashboardPies/>
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