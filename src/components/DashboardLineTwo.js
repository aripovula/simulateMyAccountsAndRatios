import React from 'react';

import ReChartLineGM from './ReChartLineGM';
import ReChartLineDE from './ReChartLineDE';
import ReChartLineLR from './ReChartLineLR';
import { ResponsiveContainer } from 'recharts';

export default class DashboardLineTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="container2">
                <div id="left2">
                    <span className="verIndentFive"></span>
                    <span className="dtitle">gross margin, in %</span>
                    <ReChartLineGM />
                </div>
                <div id="middle2">
                    <span className="verIndentFive"></span>
                    <span className="dtitle">debt-to-equity</span>
                    <ReChartLineDE />
                </div>
                <div id="right2">
                    <span className="verIndentFive"></span>
                    <span className="dtitle">leverage ratio</span>
                    <ReChartLineLR />
                </div>

            </div>

        );
    }

}