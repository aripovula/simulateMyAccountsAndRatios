import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { startSignUp } from '../actions/auth';

const modalCustomStyles = {
    content: {
        top: '30%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%',
        transform: 'translate(-50%, -50%)', width: '44%', padding: '1%', margin: '4%'
    }
};

Modal.setAppElement(document.getElementById('app'));

// Image is free for personal and commercial use, No attribution required
let imgSrc = "url('https://images.pexels.com/photos/938963/pexels-photo-938963.jpeg?cs=srgb&dl=accounting-alone-analysis-938963.jpg&fm=jpg')"

const selectLetter = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return possible.charAt(Math.floor(Math.random() * possible.length));
}

const selectNumbers = () => {
    let text = "";
    let possible = "0123456789";
    let possibleEven = "02468";
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        text += possibleEven.charAt(Math.floor(Math.random() * possibleEven.length));
    return text;
}

const generateID = () => {
    let text = "";
    for (let i = 0; i < 3; i++)
        text += selectLetter() + selectNumbers();
    return text;
}

let email = generateID()+"@notreal.com";
let password = generateID();

export const LoginPage = ({ startSignUp }) => (
    <div style={{ backgroundImage: imgSrc, width: '100%', height: 1000 }}>
        <header className="header fixedElement">
            &nbsp; Simulate accounts and ratios
        </header>
        <div className="margintop">
            {LoginModal({ startSignUp })}
        </div>
    </div>
)

const LoginModal = ({ startSignUp }) => (

    <Modal
        isOpen={true}
        style={modalCustomStyles}
    >
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
                    defaultValue={email}
                    autoComplete="off"
                    placeholder="username"
                    className="text-input forComment"
                /></div>


            <div style={{ width: 300 }}>
                <span className="horIndent"></span>

                <input
                    type="password"
                    defaultValue={password}
                    autoComplete="off"
                    placeholder="password"
                    className="text-input forComment"
                /></div>

            <br />
            <span className="horIndent"></span>
            <button
                className="button button1"
                onClick={() => startSignUp(email, password)}
            >Login</button>
            <br /><br />
        </div>
    </Modal >
);


const mapDispatchToProps = (dispatch) => (
    {
        startSignUp: () => dispatch(startSignUp(email, password))
    });

export default connect(undefined, mapDispatchToProps)(LoginPage);