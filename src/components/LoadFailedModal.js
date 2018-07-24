import React from 'react';
import Modal from 'react-modal';
import { ClimbingBoxLoader } from 'react-spinners';

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        padding: '1%',
        margin: '4%'
    }
};

Modal.setAppElement(document.getElementById('app'));

const LoadFailedModal = (props) => (

    <Modal
        isOpen={!!props.mainTextFail}
        style={customStyles}
    >
        <div className="card-4" >
            <div className='sweet-loading'>
                <span className="horIndent"></span>
                <div className='centerObj'>
                    {props.mainTextFail}
                </div>
                <br/>
                <div className='centerObj'>
                    <ClimbingBoxLoader
                        color={'#4CAF50'}
                        loading={!!props.mainTextFail}
                    />
                </div>
            </div>

            <br /><br />
        </div>
    </Modal >
);

export default LoadFailedModal;
