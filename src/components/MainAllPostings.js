import React from 'react';
import SplitterLayout from 'react-splitter-layout';

import FinStatements from './FinStatements';
import PostingsList from './PostingsList';
import PostingsListFilter from './PostingsListFilter';
import ThreeInfoTypeComp from './ThreeInfoTypeComp';

const MainAllPostings = (props) => (
  <div className="margintop">

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
