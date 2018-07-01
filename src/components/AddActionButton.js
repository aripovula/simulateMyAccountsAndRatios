import React from 'react';

const AddActionButton = (props) => {
    console.log('actBut props = ');
    console.log(props);
    //console.log('actBut name = '+props.actButton.name);
    return (
    <button className="actionButton">{props.name}</button>
    );
  }
  
  export default  AddActionButton;