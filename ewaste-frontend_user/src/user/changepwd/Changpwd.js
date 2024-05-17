import React, { Component } from 'react';
import './Changpwd.css';
import { Link, Navigate } from 'react-router-dom'
import { GOOGLE_AUTH_URL } from '../../constants';
import { changepwd } from '../../util/APIUtils';
import googleLogo from '../../img/google-logo.png';
import Alert from 'react-s-alert';

class Changpwd extends Component {
    render() {
        if(this.props.authenticated) {
            return <Navigate
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;
        }

        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Forgot your password?</h1>
                    <ForgotPwdForm {...this.props} />
                    <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                </div>
            </div>
        );
    }
}


class SocialSignup extends Component {
    render() {
        return (
            <div className="social-signup">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Sign up with Google</a>
            </div>
        );
    }
}

class ForgotPwdForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            loginName: '',
            email: '',
            phone: '',
            newPassword: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signUpRequest = Object.assign({}, this.state);

        changepwd(signUpRequest)
        .then(response => {
            Alert.success("You're successfully change the password. Please login to continue!");
            // this.props.history.push("/login");
            window.location.href = "/login"
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="loginName"
                           className="form-control" placeholder="Login Name"
                           value={this.state.loginName} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="email" name="email"
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="text" name="phone"
                           className="form-control" placeholder="Phone"
                           value={this.state.phone} onChange={this.handleInputChange}/>
                </div>
                <div className="form-item">
                    <input type="password" name="newPassword"
                        className="form-control" placeholder="New password"
                        value={this.state.newPassword} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Submit</button>
                </div>
            </form>

        );
    }
}

export default Changpwd
