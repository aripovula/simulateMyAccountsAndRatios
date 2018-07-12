import React from 'react';
import FinStatements from './FinStatements';
import PostingsList from './PostingsList';
import SplitterLayout from 'react-splitter-layout';

const MainDashboard = () => (
  <div>

    <SplitterLayout primaryIndex={0} percentage={true} primaryMinSize={30} secondaryInitialSize={50} secondaryMinSize={40}>
    <div>
      <PostingsList/>
      
    </div>
    <div>
    {/*2nd*/}

    </div>
    </SplitterLayout>
  </div>
);

export default MainDashboard;

// default export :     - LECTURE 51 - 53
// export default class  OR
// export default MainDashboard;

// export const AddPosting
// export class

// default import
//import PostingsList from './PostingsList';
// named import
// import {PostingsList} from './PostingsList';

// this.setState(()=> {});  this code does not return an empty object, it returns an undefined funtion
// to make it an objest we need to WRAP in ()
// this.setState(()=> ({}) );   this returns an object  - LECTURE #43

