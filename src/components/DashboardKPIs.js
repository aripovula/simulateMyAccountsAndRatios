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
                <span>
                    ( <span className="fact">actual</span> / <span className="plan">target</span> )
                </span><br />

                {/*   covenants  */}
                <span>
                    <span style={{ color: data.ratioInCompliance == 6 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;all covenants in compliance:
                    &nbsp;<span className="fact">{data.ratioInCompliance}</span> / <span className="plan">6</span>
                </span><br />

                {/*  receivableDays  */}
                <span>
                    <span style={{ color: data.receivableDays < 60 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;receivable days:
                    &nbsp;<span className="fact">{data.receivableDays.toFixed(1)}</span> / <span className="plan">&lt; 60</span>
                </span><br />
                {/* payableDays  */}
                <span>
                    <span style={{ color: data.payableDays > 10 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;payable days:
                    &nbsp;<span className="fact">{data.payableDays.toFixed(1)}</span> / <span className="plan">10 &lt; </span>
                </span><br />

                {/*  inventory days  */}
                <span>
                    <span style={{ color: data.inventoryDays < 60 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;inventory days:
                    &nbsp;<span className="fact">{data.inventoryDays.toFixed(1)}</span> / <span className="plan">&lt; 60</span>
                </span><br />

                {/*  sales growth  */}
                <span>
                    <span style={{ color: data.revenueGrowthPercent > 4 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;sales growth:
                    &nbsp;<span className="fact">{data.revenueGrowthPercent.toFixed(1)}%</span> / <span className="plan">4% &lt; </span>
                </span><br />

                {/*  RoE  */}
                <span>
                    <span style={{ color: data.RoE > 15 ? '#57d500' : '#ff2e00' }}>
                        &#x25cf;&nbsp;
                    </span>
                    &nbsp;return on equity:
                    &nbsp;<span className="fact">{data.RoE.toFixed(1)}%</span> / <span className="plan">15% &lt;</span>
                </span><br />

                <h1>{data.metKPI} / 6<span style={{ fontSize: 14 }}>&nbsp;&nbsp;= {(data.metPercent * 100).toFixed(0)}% meet</span></h1>
            </div>
        );
    }

    // calculates which KPIs were met
    getData = () => {

        let metKPI = 6;
        const annualizationFactor = 12 / (moment(this.props.filters.endDate).month() + 1);

        let ratioInCompliance = 6;
        for (let x = 0; x < 6; x++) {
            if (!this.props.ratioData[x].ratio_current.isCompliant) ratioInCompliance -= 1;
        }
        if (ratioInCompliance < 6) metKPI--;

        const receivables = parseFloat(this.props.financialData[1].amounts_current.balance.replace(/,/g, "")) * -1;
        const revenue = parseFloat(this.props.financialData[17].amounts_current.balance.replace(/,/g, "")) * -1;
        const revenuePY = parseFloat(this.props.financialData[17].amounts_comparatives.openingBalance.replace(/,/g, "")) * -1;

        // console.log('cmonthpie = '+moment().month());
        const normalizedRevenue = revenue * annualizationFactor;

        const receivableDays = receivables / (normalizedRevenue / 365) * -1;
        if (receivableDays > 60) metKPI--;

        const payables = parseFloat(this.props.financialData[8].amounts_current.balance.replace(/,/g, "")) * -1;
        const CoS = parseFloat(this.props.financialData[18].amounts_current.balance.replace(/,/g, ""));

        const normalizedCoS = CoS * annualizationFactor;
        const payableDays = payables / (normalizedCoS / 365);
        if (payableDays < 10) metKPI--;

        const inventories = parseFloat(this.props.financialData[2].amounts_current.balance.replace(/,/g, ""));

        const inventoryDays = inventories / (normalizedCoS / 365);
        if (inventoryDays > 60) metKPI--;

        const revenueGrowthPercent = (normalizedRevenue - revenuePY) / revenuePY * 100;
        if (revenueGrowthPercent < 4) metKPI--;

        let equity = 0;
        let equityOp = 0;
        let netIncome = 0;
        for (let x = 15; x < 17; x++) {
            equity += parseFloat(this.props.financialData[x].amounts_current.balance.replace(/,/g, ""), 10);
            equityOp += parseFloat(this.props.financialData[x].amounts_comparatives.openingBalance.replace(/,/g, ""), 10);
        }

        for (let x = 17; x < 24; x++) {
            netIncome += parseFloat(this.props.financialData[x].amounts_current.balance.replace(/,/g, ""), 10);
        }

        const normalizedNetIncome = netIncome * annualizationFactor;
        const RoE = normalizedNetIncome / ((equity + equityOp) / 2) * 100;
        if (RoE < 15) metKPI--;

        let metPercent = metKPI / 6;

        data = {
            ratioInCompliance,
            receivableDays,
            payableDays,
            inventoryDays,
            revenueGrowthPercent,
            RoE,
            metKPI,
            metPercent
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
