import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import PostingListItem from './PostingListItem';
import selectPostings from '../selectors/postings';

let countP;

class PostingsList extends React.Component {

  render() {
    console.log("from PList PROPs =");
    console.log(this.props);
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
          <div>
            {this.props.postings.length == 0 && <div className="boxedtransp"><br />No entries have been found !<br /><br /></div>}
            {this.props.postings.map((posting) => {
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
}

const mapStateToProps = (state) => {
  return {
    postings: selectPostings(state.postings, state.filters)
  };
};

export default connect(mapStateToProps)(PostingsList);
