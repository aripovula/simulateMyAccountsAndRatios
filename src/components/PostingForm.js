import React from 'react';
import moment from 'moment';
import PostingOneLine from './PostingOneLine';
//import { SingleDatePicker } from 'react-dates/initialize';
let idCounter = 1;

export default class PostingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ptype: props.posting ? props.posting.ptype : '',
      // lineItem: props.posting ? props.posting.lineItem : '',
      note: this.props.expense ? this.props.expense.note : '',
      // amount: props.expense ? (props.expense.amount / 100).toString() : '',
      //createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      //calendarFocused: false,
      error: '',
      linesData: [
        { idu: 0, isDr: true, lineItem: '', amount: 0 },
        { idu: 1, isDr: false, lineItem: '', amount: 0 }
      ]
    };
    this.processAddDrLine = this.processAddDrLine.bind(this);
    this.processAddCrLine = this.processAddCrLine.bind(this);
    this.processDeleteLine = this.processDeleteLine.bind(this);
    this.processEntryTypeChange = this.processEntryTypeChange.bind(this);
    this.onAmountChanged = this.onAmountChanged.bind(this);
    this.onLineItemChange = this.onLineItemChange.bind(this);
  }

  onActionButtonSelected = (posting) => {
    console.log('in onActionButtonSelected data=');
    console.log(posting.lines);
    idCounter = 4;
    this.setState(() => {
      return {
        note: posting.name,
        linesData: posting.lines
      }
    }, this.checkSum);
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
    this.onErrorChange('');
  };

  onLineItemChange = (e) => {
    const id2locate = e.target.id;
    const lineItem = e.target.value;
    console.log('id = ' + id2locate + ' lineItem = ' + lineItem);
    let index2change;
    let counterF = 0;
    this.state.linesData.map((lineData) => {
      if (lineData.idu == id2locate) index2change = counterF;
      counterF++;
    });
    if (!lineItem || lineItem.match(/^[a-zA-Z\d-\s]+$/)) {
      this.setState((prevState) => {
        prevState.linesData[index2change].lineItem = lineItem;
        return {
          linesData: prevState.linesData
        }
      });
      this.onErrorChange('');
    } else {
      e.target.value = this.state.linesData[index2change].lineItem;
      this.onErrorChange('Please use only letters, numbers, hyphen and space');
    }
  };

  onAmountChanged = (e) => {
    const id2locate = e.target.id;
    const amount = e.target.value;
    let index2change;
    let counterF = 0;
    this.state.linesData.map((lineData) => {
      if (lineData.idu == id2locate) index2change = counterF;
      counterF++;
    });
    console.log('id = ' + e.target.id + ' amount = ' + amount);
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState((prevState) => {
        if (!amount) { prevState.linesData[index2change].amount = '' }
        else { prevState.linesData[index2change].amount = (amount * 100).toString(); }
        return {
          linesData: prevState.linesData
        }
      }, this.checkSum);
    } else {
      e.target.value = this.state.linesData[index2change].amount;
      this.onErrorChange('Please use valid amount');
    }
  };

  processAddDrLine = () => {
    idCounter++;
    this.setState((prevState) => {
      return {
        linesData: prevState.linesData.concat({ idu: idCounter, isDr: true, lineItem: '', amount: 0 })
      }
    });
    this.onErrorChange('');
  }

  processAddCrLine = () => {
    idCounter++;
    this.setState((prevState) => {
      return {
        linesData: prevState.linesData.concat({ idu: idCounter, isDr: false, lineItem: '', amount: 0 })
      }
    });
    this.onErrorChange('');
  }

  processDeleteLine = (props) => {
    let line2remove = props.target.id;
    this.setState((prevState) => {
      return {
        linesData: prevState.linesData.filter(linesDataPr => linesDataPr.idu != line2remove)
      }
    });
    this.onErrorChange('');
  }

  processEntryTypeChange = (e) => {
    let id2locate = e.target.id;
    let index2change;
    console.log('id = ' + id2locate);
    this.setState((prevState) => {
      // console.log('state - all lines');
      let counterF = 0;
      this.state.linesData.map((lineData) => {
        console.log(lineData);
        if (lineData.idu == id2locate) { index2change = counterF; console.log(index2change); }
        counterF++;
      });
      let isDr = !prevState.linesData[index2change].isDr;
      prevState.linesData[index2change].isDr = isDr;
      console.log('id = ' + index2change + ' isDr = ' + isDr);
      return {
        linesData: prevState.linesData
      }
    }, this.checkSum);
  }

  checkSum = () => {
    let totalAmnt = 0;
    this.state.linesData.map((lineData) => {
      if (lineData.amount) {
        let amnt = parseFloat(lineData.amount, 10) / 100;
        if (lineData.isDr) totalAmnt = totalAmnt + amnt;
        if (!lineData.isDr) totalAmnt = totalAmnt - amnt;
      }
    });
    if (totalAmnt != 0) { this.onErrorChange(`Total is ${totalAmnt.toFixed(2)}, should be zero !`); }
    else this.onErrorChange('');
  }

  onErrorChange = (text) => {
    this.setState(() => { return { error: text } });
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

    if (!this.state.linesData) {
      this.onErrorChange('Please provide line item and amount');
    } else {
      this.onErrorChange('');
      this.props.onSubmit({
        linesData: this.state.linesData,
        createdAt: 0, //this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>

        {this.state.linesData.map((lineData) => {
          return <PostingOneLine
            key={lineData.idu}
            idu={lineData.idu}
            isDr={lineData.isDr}
            lineItem={lineData.lineItem}
            amount={lineData.amount}
            processDeleteLine={this.processDeleteLine}
            processEntryTypeChange={this.processEntryTypeChange}
            onAmountChanged={this.onAmountChanged}
            onLineItemChange={this.onLineItemChange}
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

          <span className="horIndent"></span>
          <span className="horIndent"></span>

          <span className="warning">{this.state.error}</span>

          <br />
          <span className="verIndent"></span>
          <span className="horIndent"></span>
          <input
            type="text"
            placeholder="Comment (optional)"
            size="60"
            className="text-input"
            value={`entry to reflect ${this.state.note.substring(5)}`}
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