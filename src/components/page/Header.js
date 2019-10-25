/*eslint max-len: ["error", { "code": 200 }]*/

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import base from '../../config/api.js';
import auth from '../../models/auth.js';

let api = base.api();

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "PamoCoin | Pro",
            name: "",
            course: "",
            wallet: "",
            orders: "",
            profile: "",
            register: "",
            logstatus: "Login"
        };
    }

    componentDidMount() {
        let that = this;

        auth.isactive()
            .then(function(res) {
                if (res.data.active) {
                    that.adminNav();
                } else {
                    that.registerNav();
                }
            });

        fetch(api)
            .then(res => res.json())
            .then(res => this.showContent(res));
    }

    adminNav() {
        this.setState({
            logstatus: "Logoff",
            wallet: <NavLink to="/wallet" className="admin" activeClassName="selected">My Wallet</NavLink >,
            orders: <NavLink to="/orders" activeClassName="selected">My Orders</NavLink >,
            profile: <NavLink to="/profile" activeClassName="selected">My Profile</NavLink >
        });
    }

    registerNav() {
        this.setState({
            register: <NavLink to="/register" className="admin" activeClassName="selected">Register</NavLink >
        });
    }

    showContent(res) {
        let data = res.data.me[0];

        this.setState({
            name: data.name,
            course: data.course
        });
    }

    render() {
        const checkActive = (match, location) => {
            if (!location) {
                return false;
            }
            const {pathname} = location;

            return pathname === "/";
        };

        return (
            <header className="site-header">
                <div className="sitle-heading">
                    <img src={logo} className="site-logo" alt="logo" />
                    <NavLink to="/">{ this.state.title }</NavLink >
                </div>
                <nav className="navbar">
                    <NavLink to="/" activeClassName="selected" isActive={checkActive}>Trade</NavLink >
                    <NavLink to="/about" activeClassName="selected">About</NavLink >
                    { this.state.register }
                    { this.state.wallet }
                    { this.state.orders }
                    { this.state.profile }
                    <NavLink to="/login" activeClassName="selected">{ this.state.logstatus }</NavLink >
                </nav>
            </header>
        );
    }
}

export default Header;
