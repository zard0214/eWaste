import React from "react";
import "./Header.css"
import menu from "../img/menu.png"
import account from "../img/account.png"
import basket from "../img/basket.png"
import sell from "../img/sell.png"
import recycle from "../img/recycle.png"
import leave from "../img/leave.png"

const Header = () => {
    const isLogin = localStorage.getItem('userId');
    const addLink = isLogin ? "/AddDevice" : "/login";
    const dataLink = isLogin ? "/DataRetrieve" : "/login";
    const basketLink = isLogin ? "/basket" : "/login";
    return (

        <header className="header" style={{maxWidth:'100%'}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="mx-2">
                    <a href="/menu" style={{textDecoration: 'none', color: '#000000'}}>
                        <div className="menu-item">
                            <img src={menu} width="40" height="40" alt={1}/>
                            <span>Menu</span>
                        </div>

                    </a>
                </div>
                <div className="header-title">
                    <a href="/homepage" className="gradient-text">
                        eWaste
                    </a>
                </div>
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="menu navbar-nav ml-auto mr-3" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <li className="nav-item">
                            <a href="/re-homepage">
                                <div className="menu-item">
                                    <img src={leave} width="40" height="40" alt={2}/>
                                    <span>To Recycle Page</span>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href={addLink}>
                                <div className="menu-item">
                                    <img src={sell} width="40" height="40" alt={2}/>
                                    <span>Sell</span>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href={dataLink}>
                                <div className="menu-item">
                                    <img src={recycle} width="40" height="40" alt={2}/>
                                    <span>Data Retrieve</span>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href={basketLink}>
                                <div className="menu-item">
                                    <img src={basket} width="40" height="40" alt={3}/>
                                    <span>Basket</span>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/login">
                                <div className="menu-item">
                                    <img src={account} width="40" height="40" alt={2}/>
                                    <span>Account</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
