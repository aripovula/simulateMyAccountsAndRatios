import React from 'react';
import Modal from 'react-modal';

const modalCustomStyles = {
    content: {
        top: '30%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%',
        transform: 'translate(-50%, -50%)', width: '44%', padding: '1%', margin: '4%'
    }
};

Modal.setAppElement(document.getElementById('app'));

const LoginModal = (props) => (

    <Modal
        isOpen={props.isOpen}
        style={modalCustomStyles}
    >
    {console.log('props')}
    {console.log(props)}

        <div className="card-4" >
            <div>
                <span className="verIndent"></span>
                <h4 className="is-active">
                    <span className="horIndent"></span>
                    Just click 'Login' button - demo version
                </h4>
            </div>

            <span className="horIndent" />
            <span className="postLineList">A random username and password were composed and will be signed up</span>
            <br /><span className="horIndent" />
            <span className="postLineList">programmatically with Google Firebase Auth when you click 'Login'.</span>
            <br /><span className="horIndent" />
            <span className="postLineList">All data will be wiped off from Google Firebase DB as soon as you log out.</span>
            <br /><br />

            <div style={{ width: 300 }}>
                <span className="horIndent"></span>
                <input
                    type="text"
                    defaultValue={props.email}
                    autoComplete="off"
                    placeholder="username"
                    className="text-input forComment"
                /></div>


            <div style={{ width: 300 }}>
                <span className="horIndent"></span>

                <input
                    type="password"
                    defaultValue={props.password}
                    autoComplete="off"
                    placeholder="password"
                    className="text-input forComment"
                /></div>

            <br />
            <span className="horIndent"></span>
            <button
                className="button button1"
                onClick={() => props.handleModalLoginClicked()}
            >Login</button>
            <br /><br />
        </div>
    </Modal >
);

export default LoginModal;