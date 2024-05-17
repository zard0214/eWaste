import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.imageUrl}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                            {/*<h2>{this.props.currentUser.name}</h2>*/}
                            <p className="profile-email">Name: {this.props.currentUser.userName}</p>
                            <p className="profile-email">Email: {this.props.currentUser.email}</p>
                            <p className="profile-email">Phone: {this.props.currentUser.phone}</p>
                            <p className="profile-email">User roles: {this.props.currentUser.authorities.map(item => (
                                <a key={item.roleName}>{item.roleName.toLowerCase()} </a>
                            ))}</p>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile
