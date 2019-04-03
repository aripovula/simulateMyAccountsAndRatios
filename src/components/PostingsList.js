import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
// local imports
import PostingListItem from './PostingListItem';
import SeparateLineItem from './SeparateLineItem';
import {selectPostings} from '../selectors/postings';
import {selectSeparateLines} from '../selectors/separateLines';
import addSimulatedEntries from '../utils/addSimulatedEntries';
import LoadingModal from './LoadingModal';
import LoadFailedModal from './LoadFailedModal';

let countP;
let isRestored = false;

export class PostingsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLinesOnly: false,
      mainText: undefined,
      mainTextFail: undefined,
      shortText: undefined
    }
    this.startRestoreDefaults = this.startRestoreDefaults.bind(this);
    this.restoreTimedOut = this.restoreTimedOut.bind(this);
  }

  startRestoreDefaults = () => {

    this.setState(() => ({
      shortText: 'In process ...',
      mainText: "Restoring defaults. Please wait"
    }));
    isRestored = false;
    setTimeout(this.restoreTimedOut, 8 * 1000);
    addSimulatedEntries(this.props);
  }

  restoreTimedOut = () => {
    if (!isRestored) {
      this.setState(() => ({
        mainText: undefined,
        mainTextFail: 'Restoring defaults failed. Please check your INTERNET connection !'
      }));
    }
  }

  componentWillReceiveProps = () => {
    this.setState(() => ({
      shortText: undefined,
      mainText: undefined,
      mainTextFail: undefined
    }));
    isRestored = true;
  }

  togglePostingsAndLines(event) {
    //console.log(event.target.value);

    if (event.target.value === 'lines') {
      this.setState(() => { return { showLinesOnly: true } });
    } else {
      this.setState(() => { return { showLinesOnly: false } });
    }
    // console.log('REDUX STATE=');
    // console.log(this.props);
  }


  render() {
    // console.log("from PList PROPs =", this.props);
    countP = 0;
    return (

      <div test-attr="postingsList">
        <LoadingModal
          mainText={this.state.mainText}
          shortText={this.state.shortText}
        />
        <LoadFailedModal
          mainTextFail={this.state.mainTextFail}
          shortText={this.state.shortText}
        />

        <ReactTooltip place="bottom" type="info" effect="float" />
        <div className="card-4">
          <div className="bggreen">
            <h4>Postings List
          <span className="horIndent"></span>
              <span className="notbold"> &nbsp; &nbsp;
                <Link to="/createposting" className="addn" >add new</Link>

                <span className="horIndent"></span>
                <span
                  data-tip="Filter by 'Line item' above to use 'entry lines' option - shows all entries on one lineitem"
                  className="text14white">show &nbsp;



                  <span onChange={this.togglePostingsAndLines.bind(this)}>
                    <label><input type="radio" value="postings" name="filterby" defaultChecked /> &nbsp;postings &nbsp;</label>
                    <label><input type="radio" value="lines" name="filterby" /> &nbsp;entry lines</label>
                  </span>
                </span>
                <span className="horIndent"></span>
                <span
                  className="text14white cursorpointer"
                  data-tip="Since other users could have posted blah blah Test entries this option deletes all postings from the database and adds / restores default entries"
                  onClick={this.startRestoreDefaults}
                >restore defaults</span>
              </span>
            </h4>
          </div>
          <div>

            {this.props.postings && this.props.postings.length == 0 && this.props.separateLines 
              
              && this.props.separateLines.length == 0 
              && <div test-attr="notFound" className="boxedtransp"><br />No entries have been found !<br /><br /></div>
            }

            {this.state.showLinesOnly == true && this.props.separateLines && this.props.separateLines.map((separateLine, i) => {
              //console.log(separateLine);
              countP++;
              return <SeparateLineItem key={separateLine.id || i} countP={countP} {...separateLine} />;
            })}

            {this.state.showLinesOnly == false && this.props.postings && this.props.postings.map((posting) => {
              //console.log(posting);
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
    postings: selectPostings(state),
    separateLines: selectSeparateLines(state)
  };
};

export default connect(mapStateToProps)(PostingsList);
