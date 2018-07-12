import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { editPosting, removePosting } from '../actions/postings';

let uniqCount = 0;
const SeparateLineItem = ({ dispatch, id, entryId, isDr, lineItem, amount, createdAt, postingDate, countP }) => (
  <div>
  <span className="verIndentFive"></span>
<p key={countP} className="postLineList">

<span className="horIndent"></span>

{isDr ? 'Dr ' : '\xa0 \xa0   Cr '} 
        
        {lineItem} &nbsp; - &nbsp;&nbsp;
        
        {(parseFloat(amount, 10) / 100).toLocaleString('en-US')}
        
        <span className="horIndent"></span>

        <Link to={`/editposting/${entryId}`} className="addnlightbg">edit</Link>
        
        <span className="smalltext">( posted on&nbsp;
          {moment(createdAt).format('MMMM D, YYYY')}&nbsp;for date of&nbsp;
          {moment(postingDate).format('MMMM D, YYYY')} )
          </span>
        </p>
  </div>
);

export default connect()(SeparateLineItem);
