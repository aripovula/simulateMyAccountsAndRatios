import React from 'react';
import FinStatements from './FinStatements';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import AddPosting from './AddPosting';
import ThreeInfoTypeComp from './ThreeInfoTypeComp';

const MainAddPosting = (props) => (
  <div>

    <SplitterLayout primaryIndex={0} percentage={true} primaryMinSize={30} secondaryInitialSize={50} secondaryMinSize={40}>
      <div>
        <AddPosting />
      </div>
      <div>
        <ThreeInfoTypeComp />
      </div>
    </SplitterLayout>
  </div>
);

export default (MainAddPosting);

/*      linesData:[
        { idu: 0, isDr: true, lineItem: 'Accounts receivable', amount: 1000 },
        { idu: 1, isDr: false, lineItem: 'Revenue', amount: 1000 },
        { idu: 2, isDr: true, lineItem: 'Cost of goods sold', amount: 900 },
        { idu: 3, isDr: false, lineItem: 'Inventory', amount: 900 }
      ]
*/