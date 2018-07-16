import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { startRemovePosting } from '../actions/postings';
import { startEditPosting } from '../actions/postings';

let uniqCount = 0;
const PostingsListItem = ({ dispatch, id, linesData, note, createdAt, postingDate, isUnPosted, totalAmount, countP }) => (
  <div className="boxed">
    <h4><span className="postingNote">{countP}. {note}</span>
      <span className="horIndent"></span>

      <Link to={`/editposting/${id}`} className="addnlightbg">edit</Link>
      
      <span className="horIndent"></span>
      
      { !isUnPosted &&
      <Link to="#" className="addnlightbg" onClick={() => {
        const newPosting = {
          linesData,
          note,
          totalAmount,
          createdAt,
          postingDate,
          isUnPosted: true
        }
        dispatch(startEditPosting(id, newPosting));
      }}>un-post</Link>}

      { isUnPosted &&
        <Link to="#" className="addnlightbg" onClick={() => {
          const newPosting = {
            linesData,
            note,
            totalAmount,
            createdAt,
            postingDate,
            isUnPosted: false
          }  
          dispatch(startEditPosting(id, newPosting));
        }}>re-post</Link>}
    
      <span className="horIndent"></span>
      <Link to="#" className="addnlightbg" onClick={() => {
        dispatch(startRemovePosting({ id }));
      }}>delete</Link>

    </h4>

    {linesData.map((line) => { { uniqCount++ } 
    return (<p
        key={uniqCount}
        className="postLineList"
        >
        {line.isDr ? 'Dr ' : '\xa0 \xa0   Cr '} 
        {line.lineItem} &nbsp; - &nbsp;&nbsp;
        {(parseFloat(line.amount, 10) / 100).toLocaleString('en-US')}
        {isUnPosted && <span style={{color:'red', fontSize: '12px'}}> &nbsp; &nbsp; ( un-posted )</span>}
        </p>)
    })}
    <span className="smalltext">( posted on&nbsp;
      {moment(createdAt).format('MMMM D, YYYY')}; &nbsp; posted for date of&nbsp;
      {moment(postingDate).format('MMMM D, YYYY')} )
      </span>
  </div>
);

export default connect()(PostingsListItem);
