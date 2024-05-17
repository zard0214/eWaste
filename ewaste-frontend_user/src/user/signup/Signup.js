import React, { Component } from 'react';
import './Signup.css';
import { Link, Navigate } from 'react-router-dom'
import { GOOGLE_AUTH_URL } from '../../constants';
import { signup } from '../../util/APIUtils';
import googleLogo from '../../img/google-logo.png';
import Alert from 'react-s-alert';
import { useLocation, useNavigate, withRouter } from "react-router-dom";

class Signup extends Component {
    render() {
        if(this.props.authenticated) {
            return <Navigate
                to={{
                pathname: "/",
                state: { from: useLocation }
            }}/>;
        }

        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Sign up with eWaste</h1>
                    <SocialSignup />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <SignupForm {...this.props} />
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
                    <img style={{marginTop: "0px"}} src={googleLogo} alt="Google" /> Sign up with Google</a>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            loginName: '',
            email: '',
            phone: '',
            password: ''
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

        const handleNavigation = () => {
            this.props.history.push('/login');
        };

        signup(signUpRequest)
        .then(response => {
            Alert.success("You're successfully registered. Please login to continue!");
            // this.props.history.push("/login");
            window.location.href = "/login"
            // handleNavigation;
            // window.location.reload()
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
                    <input type="text" name="userName"
                        className="form-control" placeholder="User Name"
                        value={this.state.userName} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="email" name="email"
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="text" name="phone"
                           className="form-control" placeholder="Phone"
                           value={this.state.phone} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password"
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Sign Up</button>
                </div>
            </form>

        );
    }
}

export default Signup
