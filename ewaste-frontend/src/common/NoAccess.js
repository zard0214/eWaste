import React, { Component } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

class NotAccess extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    Permission
                </h1>
                <div className="desc">
                    The Page you not have permission.
                </div>
                {/*<Link to="/"><button className="go-back-btn btn btn-primary" type="button">Go Back</button></Link>*/}
            </div>
        );
    }
}

export default NotAccess;
