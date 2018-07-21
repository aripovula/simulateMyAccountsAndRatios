import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'40%',
        padding: '1%',
        margin: '4%'
    }
};

Modal.setAppElement(document.getElementById('app'));

const DeleteModal = (props) => (

    <Modal
        isOpen={!!props.mainText}
        onRequestClose={props.handleClearSelectedOption}
        //contentLabel="Confirm delete"
        style={customStyles}
    >
        <div className="card-4" >
            <div className="bggreen">
                <h4>{props.shortText}</h4>
            </div>
            <br/>
            <span className="horIndent"></span>
            {props.mainText && <span>{props.mainText}</span>}
            <br/><br/>
            <span className="horIndent"></span>
            <button className="button button1" onClick={() => props.handleModalYesOptionSelected((props.lid))}>Yes</button>
            <span className="horIndent"></span>
            <button className="button button1" onClick={props.handleModalCancelOptionSelected}>Cancel</button>
            <br/><br/>
        </div>
    </Modal >
);

export default DeleteModal;
