import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { startSignUp } from '../actions/auth';
import LoadingModal from './LoadingModal';
import LoginModal from './LoginModal';
import LoadFailedModal from './LoadFailedModal';


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

let email2, password2;
let isRestored = false;
let isMounted = false;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            mainText: undefined,
            mainTextFail: undefined,
            shortText: undefined,
            email: generateID() + "@notreal.com",
            password: generateID()
        }
        this.handleModalLoginClicked = this.handleModalLoginClicked.bind(this);
    }

    handleModalLoginClicked = () => {
        email2 = this.state.email;
        password2 = this.state.password;
        if (isMounted) this.setState(() => ({
            isOpen: false,
            mainText: 'Loading app related DATA. Please wait',
            shortText: 'In process ...',
            email: generateID() + "@notreal.com",
            password: generateID()
        }));
        isRestored = false;
        setTimeout(this.restoreTimedOut, 8 * 1000);
        this.props.startSignUp(email2, password2);
    }

    restoreTimedOut = () => {
        if (!isRestored) {
            if (isMounted) this.setState(() => ({
                mainText: undefined,
                mainTextFail: 'Data loading failed. Please check your INTERNET connection !'
            }));
        }
    }

    componentDidMount = () => {
        isMounted = true;
      }
    
      componentWillUnmount = () => {
        isMounted = false;
      }
    
    componentWillReceiveProps = () => {
        if (isMounted) this.setState(() => ({
            shortText: undefined,
            mainText: undefined,
            mainTextFail: undefined
        }));
        isRestored = true;
    }

    render() {
        return (
            <div style={{ backgroundImage: imgSrc, width: '100%', height: 1000 }}>
                <LoginModal
                    isOpen = {this.state.isOpen}
                    email = {this.state.email}
                    password = {this.state.password}
                    handleModalLoginClicked = {this.handleModalLoginClicked}
                />
                <LoadingModal
                    mainText={this.state.mainText}
                    shortText={this.state.shortText}
                />
                <LoadFailedModal
                    mainTextFail={this.state.mainTextFail}
                    shortText={this.state.shortText}
                />
                <header className="header fixedElement">
                    &nbsp; Simulate accounts and ratios
                </header>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        startSignUp: () => dispatch(startSignUp(email2, password2))
    });
export default connect(undefined, mapDispatchToProps)(LoginPage);