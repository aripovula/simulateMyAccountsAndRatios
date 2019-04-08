import React from 'react';


class AddActionButton extends React.Component {
      
    render () {
    // console.log('actBut props = ');
    //console.log(props);
    //console.log('actBut name = '+props.actButton.name);
    return (
    <button
    id={this.props.idu}
    className="actionButton"
    onClick={this.props.applyActionButtonValues}
    >
    {this.props.name}
    </button>
    );
  }
}
  
export default  AddActionButton;