import React from 'react';
import { connect } from 'react-redux';
import { removePosting } from '../actions/postings';
import { Link } from 'react-router-dom';

let uniqCount=0;
const PostingsListItem = ({ dispatch, id, linesData, note, createdAt, countP }) => (
  <div className="boxedtransp">
    <h4 className="postingNote">{countP}. {note}
    <span className="horIndent"></span>
    <Link to="#" className="addn" onClick={() => {
      dispatch(removePosting({ id }));
    }}>remove</Link>
    </h4>
    
    {linesData.map((line)=> {
      {uniqCount++}
      return <p key={uniqCount} className="postLineList">{line.isDr ? 'Dr ' : 'Cr '} {line.lineItem} - {  (parseFloat(line.amount, 10) / 100).toLocaleString('en-US')}</p>
    })}
  </div>
);

export default connect()(PostingsListItem);
