import React from 'react';
import SplitterLayout from 'react-splitter-layout';

import FinStatements from './FinStatements';
import PostingsList from './PostingsList';
import PostingsListFilter from './PostingsListFilter';
import ThreeInfoTypeComp from './ThreeInfoTypeComp';

const MainAllPostings = () => (
  <div>

    <SplitterLayout primaryIndex={0} percentage={true} primaryMinSize={30} secondaryInitialSize={50} secondaryMinSize={40}>
      <div>
        <PostingsListFilter />
        <PostingsList />

      </div>
      <div>
        {/*2nd*/}
        <ThreeInfoTypeComp/>
      </div>
    </SplitterLayout>
  </div>
);

export default MainAllPostings;

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

