import React from 'react';
import { connect } from 'react-redux';
// import { startLogin } from '../actions/auth';
import { startSignUp } from '../actions/auth';
import Modal from 'react-modal';
// import fLoader from 'file-loader';
// import uLoader from 'url-loader';

//import LoginModal from './LoginModal';
const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '44%',
        padding: '1%',
        margin: '4%'
    }
};


Modal.setAppElement(document.getElementById('app'));

//import BGImage from '../../public/images/loginImage.jpg';

// const styles = {
//     paperContainer: {
//         backgroundImage: `url(${BGImage})`
//     }
// };


export const LoginPage = ({ startSignUp }) => (
    // source of image: https://www.pexels.com/photo/person-s-hand-on-top-of-laptop-while-working-938963/
    // Free for personal and commercial use, No attribution required
    <div>
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
        style={customStyles}
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

            <div style={{ width: 250 }}>
                <span className="horIndent"></span>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="username"
                    className="text-input forComment"
                /></div>


            <div style={{ width: 250 }}>
                <span className="horIndent"></span>

                <input
                    type="password"
                    autoComplete="off"
                    placeholder="password"
                    size="12"
                    className="text-input forComment"
                /></div>

            <br />
            <span className="horIndent"></span>
            <button
                className="button button1"
                onClick = { () => startSignUp()}
            >Login</button>
            <br /><br />
        </div>
    </Modal >
);

const mapDispatchToProps = (dispatch) => (
    {
        startSignUp: () => dispatch(startSignUp())
    });

export default connect(undefined, mapDispatchToProps)(LoginPage);