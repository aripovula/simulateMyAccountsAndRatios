import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

let date = new Date();
const pydate = moment('' + (date.getFullYear() - 1) + '-12-31');

class SimpleBarsRatio extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { rawData } = this.props;
        let smalls = [];
        let data = [];
        smalls = rawData.slice(0, 5);
        smalls.map(item => {
            let newItem = {
                name: item.ratioDesc.title.substring(0,14) + ' ( '+item.ratioMin+' )',
                py: item.ratio_comparatives.ratioOp.toFixed(4),
                cy: item.ratio_current.ratio.toFixed(4),
                target: item.ratioMinN
            }
            data.push(newItem);
        });

        return (
            <div style={{ fontSize: 12 }}>
                <ResponsiveContainer width='100%' aspect={4.0 / 1.0}>
                    <BarChart width={300} height={300} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="py" fill="#00C49F" name = {`as at ${pydate.format('MMM D, YYYY')}    `} />
                        <Bar dataKey="target" fill="#FFBB28" name = "Threshold" />
                        <Bar dataKey="cy" fill="#0088FE" name = {`as at ${moment(this.props.filters.endDate).format('MMM D, YYYY')}    `} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      filters: state.filters
    };
  };
  
export default connect(mapStateToProps)(SimpleBarsRatio);
  