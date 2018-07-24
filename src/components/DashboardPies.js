import React from 'react';

import ReChartPieChart from './ReChartPieChart';
import ReChartPieMarket from './ReChartPieMarket';
import { ResponsiveContainer } from 'recharts';

export default class DashboardPies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="container">
            <div id="left">                     <span>market share</span>           <ReChartPieMarket /></div>
            <div id="content">                        <span>geographic presence</span>        <ReChartPieChart /></div>
            <div id="right">
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

        );
    }

}