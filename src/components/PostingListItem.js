import React from 'react';
import { connect } from 'react-redux';
import { removePosting } from '../actions/postings';

let uniqCount=0;
const PostingsListItem = ({ dispatch, id, linesData, note, createdAt }) => (
  <div>
    <h4>{note}</h4>
    
    {linesData.map((line)=> {
      {uniqCount++}
      return <p key={uniqCount} className="postLineList">{line.isDr ? 'Dr ' : 'Cr '} {line.lineItem} - {line.amount}</p>
    })}

    <button onClick={() => {
      dispatch(removePosting({ id }));
    }}>Remove</button>
    <br/>
  </div>
);

export default connect()(PostingsListItem);
