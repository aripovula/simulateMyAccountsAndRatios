import React from 'react';
import { connect } from 'react-redux';
import PostingListItem from './PostingListItem';
import selectPostings from '../selectors/postings';
import { Link } from 'react-router-dom';

let countP;
const PostingsList = (props) => {
  console.log("from PList PROPs =");
  console.log(props);
  countP = 0;
  return (

    <div>
      <div className="card-4">
        <div className="bggreen">
          <h4>Postings List
          <span className="horIndent"></span>
          <Link to="/createposting" className="addn" >add new</Link>
          </h4>
        </div>
        {console.log('postings')}
        <div>
          {props.postings.length == 0 && <div className="boxedtransp"><br/>No entries have been posted yet !<br/><br/></div>}
          {props.postings.map((posting) => {
            console.log(posting);
            countP++;
            return <PostingListItem key={posting.id} countP={countP} {...posting} />;
          })}
        </div>
        <span className="verIndentFive"></span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postings: selectPostings(state.postings, state.filters)
  };
};

export default connect(mapStateToProps)(PostingsList);
