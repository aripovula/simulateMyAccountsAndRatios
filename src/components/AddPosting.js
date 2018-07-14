import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import PostingForm from './PostingForm';
import AddActionButton from './AddActionButton';
import { startAddPosting } from '../actions/postings';


let actButtons;

class AddPosting extends React.Component {
  constructor(props) {
    console.log('in AddPosting');
    super(props);
    actButtons = this.getActionButtons(); // this function is defined at the bottom
    this.state = {
    }
    this.textInput = React.createRef();
    this.applyActionButtonValues = this.applyActionButtonValues.bind(this);
  }

  applyActionButtonValues = (e) => {
    console.log('in applyActionButtonValues');
    console.log(e.target.id);
    this.textInput.current.onActionButtonSelected(actButtons[e.target.id]);
  }

  render() {
    return (
      <div>
        <div className="boxed ">

          {/* this part renders 8 action buttons */}
          {actButtons.map((actButton) => {
            return <AddActionButton
              key={actButton.idu}
              idu={actButton.idu}
              name={actButton.name}
              applyActionButtonValues={this.applyActionButtonValues}
            />;
          })}
        </div>

        <div className="card-4">
          <div className="bggreen">

            <h4><strong>Entry Form</strong> - use options above</h4>
          </div>
          <PostingForm
            ref={this.textInput}
            onSubmit={(posting) => {
              console.log('POSTING addPosting = ');
              console.log(posting);
              console.log(posting.is2go2list);
              this.props.dispatch(startAddPosting(posting));//.then(() => {
                if (posting.is2go2list) this.props.history.push('/postings');
                if (!posting.is2go2list) this.textInput.current.onStayHereSelected();
              //});
            }}
          />
          <br />
        </div>
      </div>
    );
  }

  getActionButtons = () => {
    return [
      {
        idu: 0, name: 'book Revenue and\n\r COGS',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Accounts receivable', amount: 100000 },
          { idu: 1, isDr: false, lineItem: 'Revenue', amount: 100000 },
          { idu: 2, isDr: true, lineItem: 'Cost of goods sold', amount: 90000 },
          { idu: 3, isDr: false, lineItem: 'Inventory', amount: 90000 }
        ]
      },
      {
        idu: 1, name: 'book Admin\n\r expenses',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Admin expenses', amount: 100000 },
          { idu: 1, isDr: false, lineItem: 'Accounts payable', amount: 100000 }
        ]
      },
      {
        idu: 2, name: 'book Advance\n\r payments',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Advance payments', amount: 100000 },
          { idu: 1, isDr: false, lineItem: 'Cash and equivalents', amount: 100000 }
        ]
      },
      {
        idu: 3, name: 'book Short-term\n\r lending',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Short-term loans', amount: 2000000 },
          { idu: 1, isDr: false, lineItem: 'Cash and equivalents', amount: 2000000 }
        ]
      },
      {
        idu: 4, name: 'book Long-term\n\r lending',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Long-term loans', amount: 8000000 },
          { idu: 1, isDr: false, lineItem: 'Cash and equivalents', amount: 8000000 }
        ]
      },
      {
        idu: 5, name: 'book Short-term\n\r borrowing',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and equivalents', amount: 2000000 },
          { idu: 1, isDr: false, lineItem: 'Short-term borrowings', amount: 2000000 }
        ]
      },
      {
        idu: 6, name: 'book Long-term\n\r borrowing',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and equivalents', amount: 8000000 },
          { idu: 1, isDr: false, lineItem: 'Long-term borrowings', amount: 8000000 }
        ]
      },
      {
        idu: 7, name: 'book Inventory\n\r purchase',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Inventory', amount: 5000000 },
          { idu: 1, isDr: false, lineItem: 'Accounts payable', amount: 5000000 }
        ]
      }
    ];
  }

}


export default withRouter(connect()(AddPosting));


