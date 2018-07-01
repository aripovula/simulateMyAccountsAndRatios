import React from 'react';
import FinStatements from './FinStatements';
import BarChart from './BarChart';
//import SplitPane from 'react-split-pane';
import SplitterLayout from 'react-splitter-layout';
import MyBarChart from './BarChart';
import Gchart from './Gchart';
import GChart from './Gchart';

const MainDashboard = () => (
  <div>

    <SplitterLayout primaryIndex={0} percentage={true} primaryMinSize={30} secondaryInitialSize={50} secondaryMinSize={40}>
    <div>
        <GChart/>
    </div>
    <div>2nd
        
    </div>
    </SplitterLayout>
  </div>
);

export default MainDashboard;
