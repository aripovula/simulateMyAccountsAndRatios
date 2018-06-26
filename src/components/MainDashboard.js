import React from 'react';
import FinStatements from './FinStatements';
import BarChart from './BarChart';
import SplitPane from 'react-split-pane';

const MainDashboard = () => (
  <div>
    <SplitPane split="vertical" minSize={500}>
    <div>LEFT</div>
    <SplitPane split="horizontal" minSize={300}>
        <div>
            //UPPE
        </div>
        <div>
            //LOWER
            <FinStatements/>
        </div>
    </SplitPane>
    </SplitPane>


  </div>
);

export default MainDashboard;
