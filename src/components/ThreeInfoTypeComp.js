import React from 'react';

import FinStatements from './FinStatements';
//import GChart from './Gchart';
import SimpleBarChart from './ReChartBars';
import ReChartRadialBar from './ReChartRadialBar';
import ReChartPieChart from './ReChartPieChart';
import ReChartStackedBars from './ReChartStackedBars';


export default class ThreeInfoTypeComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoType: 1,
            button1Color: 'greenc',
            button2Color: 'bluec',
            button3Color: 'bluec'
        };
        this.handleInfoType = this.handleInfoType.bind(this);
    }

    handleInfoType(e) {
        let type = e.target.id;
        this.setState({
            infoType: type,
            button1Color: type == 1 ? 'greenc' : 'bluec',
            button2Color: type == 2 ? 'greenc' : 'bluec',
            button3Color: type == 3 ? 'greenc' : 'bluec'
        });

    }

    render() {
        return (
            <div>
                <span className="verIndentFive"></span>
                <span className="horIndent"></span>

                <button
                    id="1"
                    className={this.state.button1Color}
                    type="button"
                    onClick={this.handleInfoType}
                >Trial balance
                </button>

                &nbsp;

                <button
                    id="2"
                    className={this.state.button2Color}
                    type="button"
                    onClick={this.handleInfoType}
                >Covenants' list
                </button>

                &nbsp;

                <button
                    id="3"
                    className={this.state.button3Color}
                    type="button"
                    onClick={this.handleInfoType}
                >Charts
                </button>

                <div className="boxedExact">
                    {this.state.infoType == 1 && <FinStatements />}
                    {this.state.infoType == 3 &&
                        <div>
                            <SimpleBarChart />
                            <ReChartRadialBar />
                            <ReChartPieChart />
                            <ReChartStackedBars />
                        </div>
                    }
                </div>
            </div>
        );
    }

}