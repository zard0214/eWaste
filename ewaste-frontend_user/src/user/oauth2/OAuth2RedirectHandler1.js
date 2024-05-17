import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Navigate } from 'react-router-dom'
class OAuth2RedirectHandler1 extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        console.log("results: " + decodeURIComponent(results[1].replace(/\+/g, ' ')))
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if(token) {
            console.log("token")
            localStorage.setItem(ACCESS_TOKEN, token);
            return <Navigate to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;
        } else {
            console.log("no token")
            return <Navigate to={{
                pathname: "/login",
                state: {
                    from: this.props.location,
                    error: error
                }
            }}/>;
        }
    }
}

export default OAuth2RedirectHandler1;
