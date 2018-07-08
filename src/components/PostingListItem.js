import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { removePosting } from '../actions/postings';

let uniqCount = 0;
const PostingsListItem = ({ dispatch, id, linesData, note, createdAt, postingDate, countP }) => (
  <div className="boxedtransp">
    <h4><span className="postingNote">{countP}. {note}</span>
      <span className="horIndent"></span>
      <Link to="#" className="addn" onClick={() => {
        //dispatch(removePosting({ id }));
      }}>un-post</Link>

      <span className="horIndent"></span>
      <Link to="#" className="addn" onClick={() => {
        dispatch(removePosting({ id }));
      }}>remove</Link>

    </h4>

    {linesData.map((line) => { { uniqCount++ } 
    return (<p
        key={uniqCount}
        className="postLineList"
        >
        {line.isDr ? 'Dr ' : '\xa0 \xa0   Cr '} 
        {line.lineItem} - 
        {(parseFloat(line.amount, 10) / 100).toLocaleString('en-US')}
        </p>)
    })}
    <span className="smalltext">( posted on &nbsp;
      {moment(createdAt).format('MMMM D, YYYY')}; &nbsp; posted for date of &nbsp;
      {moment(postingDate).format('MMMM D, YYYY')} )
      </span>
  </div>
);

export default connect()(PostingsListItem);
