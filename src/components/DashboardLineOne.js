import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ReChartPieChart from './ReChartPieChart';
import ReChartPieMarket from './ReChartPieMarket';
import { ResponsiveContainer } from 'recharts';
import DashboardKPIs from './DashboardKPIs';

class DashboardLineOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="container">
                <div id="left">
                    <span className="verIndentFive"></span>
                    <span className="dtitle">market share - {moment(this.props.filters.endDate).format('DD MMM, YYYY')}</span>
                    <ReChartPieMarket />
                </div>
                <div id="middle">
                    <span className="verIndentFive"></span>
                    <span className="dtitle">geographic presence - {moment(this.props.filters.endDate).format('DD MMM, YYYY')}</span>
                    <ReChartPieChart />
                </div>
                <div id="right">
                    <span className="verIndentFive"></span>
                    <span className="dtitle">monthly KPI status - {moment(this.props.filters.endDate).format('DD MMM, YYYY')}</span>
                    <DashboardKPIs />
                </div>

            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(DashboardLineOne);
