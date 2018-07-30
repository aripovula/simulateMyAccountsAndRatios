import React from 'react';
import { connect } from 'react-redux';
import { RadialBarChart, RadialBar, Legend, PolarAngleAxis } from 'recharts';

import { selectFinancialData } from '../selectors/financialData';

let data = [];

const style = {
  top: 20,
  left: 300,
  lineHeight: '24px'
};

class ReChartRadialBar extends React.Component {

  render() {
    data = this.getData();
    return (
      <div style={{ fontSize: "12px" }}>
        <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
          <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='uv' />
          <PolarAngleAxis type="number" domain={[0, 100]} dataKey={'uv'} angleAxisId={0} tick={false} />
          <Legend iconSize={10} width={220} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style} />
        </RadialBarChart>
      </div>
    );
  }

  getData = () => {
    const data = [
      { name: this.props.financialData[0].TBLineItems.lineItem, uv: (this.props.financialData[0].percent_change.percentChange * 100).toFixed(2), fill: '#8884d8' },
      { name: this.props.financialData[1].TBLineItems.lineItem, uv: (this.props.financialData[1].percent_change.percentChange * 100).toFixed(2), fill: '#83a6ed' },
      { name: this.props.financialData[2].TBLineItems.lineItem, uv: (this.props.financialData[2].percent_change.percentChange * 100).toFixed(2), fill: '#8dd1e1' },
      { name: this.props.financialData[8].TBLineItems.lineItem, uv: (this.props.financialData[8].percent_change.percentChange * 100).toFixed(2), fill: '#82ca9d' },
      { name: this.props.financialData[9].TBLineItems.lineItem, uv: (this.props.financialData[9].percent_change.percentChange * 100).toFixed(2), fill: '#a4de6c' },
      { name: this.props.financialData[13].TBLineItems.lineItem, uv: (this.props.financialData[13].percent_change.percentChange * 100).toFixed(2), fill: '#d0ed57' },
      { name: this.props.financialData[14].TBLineItems.lineItem, uv: (this.props.financialData[14].percent_change.percentChange * 100).toFixed(2), fill: '#ffc658' }
    ];
    return data;
  }
}

const mapStateToProps = (state) => {
  return {
    financialData: selectFinancialData(state)
  };
};

export default connect(mapStateToProps)(ReChartRadialBar);