/*eslint max-len: ["error", { "code": 150 }]*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        };
    }
    componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        if (localStorage.getItem("activeUser")) {
            let user = localStorage.getItem("activeUser"),
                profile = [];

            profile = JSON.parse(user);
            this.setState({
                user: {
                    name: profile.name,
                    birthday: profile.birthday,
                    country: profile.country,
                    email: profile.email
                }
            });
        }
    }

    render() {
        return (
            <main>
                <div className="page-heading">
                    <h1>My Profile</h1>
                </div>
                <article>
                    <div className="column">
                        <div className="column-1">
                            <div className="profile" key="profile">
                                <div className="user">
                                    <p>Username: {this.state.user.name}</p>
                                </div>
                                <div className="user">
                                    <p>Birthday: {this.state.user.birthday}</p>
                                </div>
                                <div className="user">
                                    <p>Country: {this.state.user.country}</p>
                                </div>
                                <div className="user">
                                    <p>Email: {this.state.user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        );
    }
}

export default Profile;
