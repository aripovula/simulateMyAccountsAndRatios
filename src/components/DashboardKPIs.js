import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { selectRatioData } from '../selectors/ratioData';
import { selectFinancialData } from '../selectors/financialData';

let data = [];

class DashboardKPIs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        data = this.getData();
        return (
            <div style={{ fontSize: 12 }}>
                <span className="verIndentFive"></span>
                <span>( <span className="plan">target</span> / <span className="fact">actual</span> )</span><br />

                {/*   covenants  */}
                <span>
                    <span style={{ color: data.ratioInCompliance == 6 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;all covenants in compliance: <span className="plan">6</span> / <span className="fact">{data.ratioInCompliance}</span>
                </span><br />

                {/*  receivableDays  */}
                <span>
                    <span style={{ color: data.receivableDays < 100 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;receivable days: <span className="plan">&lt; 100</span> / <span className="fact">{data.receivableDays.toFixed(0)}</span>
                </span><br />
                {/* payableDays  */}
                <span>
                    <span style={{ color: data.payableDays > 100 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;payable days: <span className="plan">40 &lt; </span> / <span className="fact">{data.payableDays.toFixed(0)}</span>
                </span><br />

                {/*  sales growth  */}
                <span>
                    <span style={{ color: data.receivableDays < 100 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;receivable days: <span className="plan">&lt; 100</span> / <span className="fact">{data.receivableDays.toFixed(0)}</span>
                </span><br />

                {/*  receivableDays  */}
                <span>
                    <span style={{ color: data.receivableDays < 100 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;receivable days: <span className="plan">&lt; 100</span> / <span className="fact">{data.receivableDays.toFixed(0)}</span>
                </span><br />

                {/*  receivableDays  */}
                <span>
                    <span style={{ color: data.receivableDays < 100 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;receivable days: <span className="plan">&lt; 100</span> / <span className="fact">{data.receivableDays.toFixed(0)}</span>
                </span><br />
                
                <h1>6 / 6<span style={{ fontSize: 12 }}>&nbsp;&nbsp;= 100% meet</span></h1>
            </div>
        );
    }

    getData = () => {
        let ratioInCompliance = 6;
        for (let x = 0; x < 6; x++) {
            if (!this.props.ratioData[x].ratio_current.isCompliant) ratioInCompliance -= 1;
        }

        const receivables = parseFloat(this.props.financialData[1].amounts_current.balance.replace(/,/g, "")) * -1;
        const revenue = parseFloat(this.props.financialData[17].amounts_current.balance.replace(/,/g, "")) * -1;

        const receivableDays = receivables / (revenue / 365) * -1;

        const payables = parseFloat(this.props.financialData[8].amounts_current.balance.replace(/,/g, "")) * -1;
        const CoS = parseFloat(this.props.financialData[18].amounts_current.balance.replace(/,/g, ""));

        const payableDays = payables / (CoS / 365);

        data = {
            ratioInCompliance,
            receivableDays,
            payableDays
        }
        return data;
    }
}

const mapStateToProps = (state) => {
    return {
        financialData: selectFinancialData(state),
        ratioData: selectRatioData(state),
        filters: state.filters
    };
};

export default connect(mapStateToProps)(DashboardKPIs);
