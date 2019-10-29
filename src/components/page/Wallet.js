/*eslint max-len: ["error", { "code": 150 }]*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import base from '../../config/api.js';
let api = base.api();

class Wallet extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.getWallet = this.getWallet.bind(this);
        this.makeDeposit = this.makeDeposit.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.state = {
            wallet: "",
            amount: ""
        };
    }
    componentDidMount() {
        this.getWallet();
    }

    getWallet() {
        let that = this;

        if (localStorage.getItem("activeUser")) {
            let user = localStorage.getItem("activeUser"),
                token = localStorage.getItem("token"),
                profile = JSON.parse(user),
                data = {
                    username: profile.name
                };

            token = JSON.parse(token);

            fetch(api + "/wallet", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
                .then(res => res.json())
                .then(function(res) {
                    that.setState({
                        wallet: {
                            pamocoin: res.data.pamocoin,
                            bthcoin: res.data.bthcoin,
                            krona: res.data.krona
                        }
                    });
                });
        }
    }

    makeDeposit(e) {
        e.preventDefault();
        let that = this;

        const data = new FormData(e.target);

        let amount = data.get('amount');

        if (localStorage.getItem("activeUser")) {
            let user = localStorage.getItem("activeUser"),
                token = localStorage.getItem("token"),
                profile = JSON.parse(user);

            let data = {
                username: profile.name,
                deposit: amount
            };

            token = JSON.parse(token);

            fetch(api + "/deposit", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
                .then(res => res.json())
                .then(() => this.setState({ amount: "" }))
                .then(() => that.getWallet());
        }
    }

    changeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    render() {
        return (
            <main>
                <div className="page-heading">
                    <h1>My Wallet</h1>
                </div>
                <article>
                    <div className="column">
                        <div className="column-1">
                            <div className="wallet">
                                <div className="coin">
                                    <p>PamoCoin</p>
                                    <p>{ this.state.wallet.pamocoin }</p>
                                </div>
                                <div className="coin">
                                    <p>BTHCoin</p>
                                    <p>{ this.state.wallet.bthcoin }</p>
                                </div>
                                <div className="coin">
                                    <p>Krona</p>
                                    <p>{ this.state.wallet.krona }:-</p>
                                </div>
                            </div>
                            <form action="/wallet" className="form-register" onSubmit={this.makeDeposit}>
                                <label className="form-label">Deposit amount
                                    <input
                                        className="form-input"
                                        type="number"
                                        min="1.00"
                                        step=".01"
                                        name="amount"
                                        placeholder = "SEK"
                                        required
                                        value={ this.state.amount }
                                        onChange={this.changeAmount}
                                    />
                                </label>
                                <input className="button center" type="submit" name="deposit" value="Deposit" />
                            </form>
                        </div>
                    </div>
                </article>
            </main>
        );
    }
}

export default Wallet;
