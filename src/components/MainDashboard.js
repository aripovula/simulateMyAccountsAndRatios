import React from 'react';
import FinStatements from './FinStatements';
import PostingsList from './PostingsList';
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
        {/*<GChart/>*/}
    </div>
    <div>
    {/*2nd*/}
      <PostingsList/>
    </div>
    </SplitterLayout>
  </div>
);

export default MainDashboard;

// default export :
// export default class  OR
// export default MainDashboard;

// export const AddPosting
// export class

// default import
//import PostingsList from './PostingsList';
// named import
// import {PostingsList} from './PostingsList';