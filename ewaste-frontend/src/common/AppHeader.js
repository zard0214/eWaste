import React, { useState, useEffect, Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';
import {Avatar, Modal, Button} from 'antd';
import {CURRENTUSER} from "../constants";

// const AppHeader = (props) => {
//
//     const [isModalOpen, setIsModalOpen] = useState(false);
//
//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//
//     const handleOk = () => {
//         setIsModalOpen(false);
//     };
//
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };
// }

class AppHeader extends Component {
    constructor(props) {
        super(props);
        console.log(localStorage.getItem(CURRENTUSER));
    }


    render() {
        return (
            <header className="app-header">
                <div className="header_container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">eWaste</Link>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                                { this.props.authenticated ? (
                                    <ul>

                                        <li>
                                            <Avatar shape="square" size="large" src={localStorage.getItem(CURRENTUSER)}/>
                                        </li>
                                        <li>
                                            <NavLink to="/profile">
                                                Profile</NavLink>
                                        </li>
                                        {/*<Button type="primary" onClick={showModal}>*/}
                                        {/*    Open Modal*/}
                                        {/*</Button>*/}
                                        {/*<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>*/}
                                        {/*    <p>Some contents...</p>*/}
                                        {/*    <p>Some contents...</p>*/}
                                        {/*    <p>Some contents...</p>*/}
                                        {/*</Modal>*/}
                                        <li>
                                            <a onClick={this.props.onLogout}>Logout</a>
                                        </li>
                                    </ul>
                                ): (
                                    <ul>
                                        <li>
                                            <NavLink to="/login">Login</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/signup">Signup</NavLink>
                                        </li>
                                    </ul>
                                )}
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;
