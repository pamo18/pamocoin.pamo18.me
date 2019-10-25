/*eslint max-len: ["error", { "code": 120 }]*/

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import auth from '../../models/auth.js';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    adminNav() {
        this.setState({
            logstatus: "Logoff",
            wallet: <NavLink to="/wallet" activeClassName="selected">Wallet</NavLink >,
            orders: <NavLink to="/orders" activeClassName="selected">Orders</NavLink >,
            profile: <NavLink to="/profile" activeClassName="selected">Profile</NavLink >
        });
    }

    registerNav() {
        this.setState({
            register: <NavLink to="/register" activeClassName="selected">Register</NavLink >
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
            <footer className="site-footer">
                <div className="copyright">Copyright 2019 Paul Moreland</div>
                <nav className="navbar navbar-small">
                    <NavLink to="/" activeClassName="selected" isActive={checkActive}>Trade</NavLink >
                    <NavLink to="/about" activeClassName="selected">About</NavLink >
                    { this.state.register }
                    { this.state.wallet }
                    { this.state.orders }
                    { this.state.profile }
                    <NavLink to="/login" activeClassName="selected">{ this.state.logstatus }</NavLink >
                </nav>
            </footer>
        );
    }
}

export default Footer;
