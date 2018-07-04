import React from 'react';
import moment from 'moment';
import PostingOneLine from './PostingOneLine';
//import { SingleDatePicker } from 'react-dates/initialize';

// let isDr = true;
let idCounter = 1;
// let linesData = [
//     {idu:0, isDr:true},
//     {idu:1, isDr:false}
// ];

// export const RemoveLine = () => {
//   console.log('in removeLine');
//   linesData.push({idu:idCounter,isDr:true});
//    this.forceUpdate();
// }

export default class PostingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        ptype: props.posting ? props.posting.ptype : '',
        lineItem: props.posting ? props.posting.lineItem : '',
        note: props.expense ? props.expense.note : '',
        amount: props.expense ? (props.expense.amount / 100).toString() : '',
        //createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
        //calendarFocused: false,
        error: '',
        linesData: [
          {idu:0, isDr:true},
          {idu:1, isDr:false}
        ]
    };
    this.processAddDrLine = this.processAddDrLine.bind(this);
    this.processAddCrLine = this.processAddCrLine.bind(this);
    this.processDeleteLine = this.processDeleteLine.bind(this);
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onTypeChange = (e) => {
    isDr = !isDr;
    const ptype = isDr ? 'Dr' : 'Cr';
    this.setState(() => ({ ptype }));
  };
  onLineItemChange = (e) => {
    const lineItem = e.target.value;
    this.setState(() => ({ lineItem }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onCloseClick = (e) => {
    console.log(e.target.id);
    RemoveLine().bind(this);
  }

  processAddDrLine = () => {
      idCounter++;
      this.setState((prevState) => {
        return {
          linesData: prevState.linesData.concat({idu:idCounter, isDr:true})
        }
      });
  }

  processAddCrLine = () => {
    idCounter++;
    this.setState((prevState) => {
      return {
        linesData: prevState.linesData.concat({idu:idCounter, isDr:false})
      }
    });
  }

  processDeleteLine = (props) => {
    let line2remove = props.target.id;
    this.setState((prevState) => {
      return {
        linesData:prevState.linesData.filter(linesDataPr =>linesDataPr.idu != line2remove)
      }  
    });
  }
  
//   onDateChange = (createdAt) => {
//     if (createdAt) {
//       this.setState(() => ({ createdAt }));
//     }
//   };
//   onFocusChange = ({ focused }) => {
//     this.setState(() => ({ calendarFocused: focused }));
//   };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.lineItem || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide line item and amount.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        ptype: this.state.ptype,
        lineItem: this.state.lineItem,
        amount: parseFloat(this.state.amount, 10) * 100,
        // createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render () {
    return (
       <form className="form" onSubmit={this.onSubmit}>
         {this.state.error && <p className="form__error">{this.state.error}</p>}

         {this.state.linesData.map((lineData) => {
          return <PostingOneLine
            key={lineData.idu}
            idu= {lineData.idu}
            isDr = {lineData.isDr}
            processDeleteLine = {this.processDeleteLine}
          />
        })}
    
        {/*<SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />*/}
        <div>
          <span className="verIndent"></span>
            <span className="horIndent"></span>
            
            <button
              className="button1"
              type="button"
              onClick={this.processAddDrLine}
              >+ Dr line
            </button>

            <span className="horIndent"></span>

            <button
              className="button1"
              type="button"
              onClick={this.processAddCrLine}
              >+ Cr line
            </button>
            <br/>
            <span className="verIndent"></span>
            <span className="horIndent"></span>
            <input
            type="text"
              placeholder="Comment (optional)"
              size="60"
              className="text-input"
              value={this.state.note}
              onChange={this.onNoteChange}
            />
            <span className="verIndent"></span>
            <span className="horIndent"></span>
            <button className="button1">Post Entry</button>
        </div>
      </form>
    )
  }
  //render();
}