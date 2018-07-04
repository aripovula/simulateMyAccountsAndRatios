import React from 'react';

const AddActionButton = ({idu, name}) => {
    console.log('actBut props = ');
    //console.log(props);
    //console.log('actBut name = '+props.actButton.name);
    return (
    <button
    className="actionButton"
    onClick={()=>{console.log('btn idu ='+idu)}}
    >
    {name}
    </button>
    );
  }
  
  export default  AddActionButton;