import React from 'react';
import FinStatements from './FinStatements';
import { connect } from 'react-redux';
import BarChart from './BarChart';
//import SplitPane from 'react-split-pane';
import SplitterLayout from 'react-splitter-layout';
import MyBarChart from './BarChart';
import Gchart from './Gchart';
import AddPosting from './AddPosting';

const MainAddPosting = (props) => (
  <div>

    <SplitterLayout primaryIndex={0} percentage={true} primaryMinSize={30} secondaryInitialSize={50} secondaryMinSize={40}>
    <div>
        <AddPosting/>
    </div>
    <div className="boxedtransp">
    Financial statements
        <FinStatements/>
    </div>
    </SplitterLayout>
  </div>
);

export default (MainAddPosting);
