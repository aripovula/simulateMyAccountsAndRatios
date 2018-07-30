import React from 'react';

import ReChartRadialBar from './ReChartRadialBar';
import ReChartStackBarAL from './ReChartStackBarAL';
import ReChartStackBarEL from './ReChartStackBarEL';
import { ResponsiveContainer } from 'recharts';

export default class DashboardLineThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="container3">
                <div id="left3">
                    <span className="verIndentFive"></span>
                    <span className="dtitle">change structure, in %</span>
                    <ReChartRadialBar />
                </div>
                <div id="middle3">
                    <span className="verIndentFive"></span>
                    <span className="dtitle">funding structure</span>
                    <ReChartStackBarEL />
                </div>
                <div id="right3">
                    <span className="verIndentFive"></span>
                    <span className="dtitle">current a/l</span>
                    <ReChartStackBarAL />
                </div>

            </div>

        );
    }

}