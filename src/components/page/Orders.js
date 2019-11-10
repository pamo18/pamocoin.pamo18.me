/*eslint max-len: ["error", { "code": 150 }]*/

import React, { Component } from 'react';
import base from '../../config/api.js';
let api = base.api();

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: ""
        };
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders() {
        let that = this;

        if (localStorage.getItem("activeUser")) {
            let user = localStorage.getItem("activeUser"),
                token = localStorage.getItem("token"),
                profile = JSON.parse(user),
                data = {
                    username: profile.name
                };

            token = JSON.parse(token);

            fetch(api + "/orders", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
                .then(res => res.json())
                .then(function(res) {
                    let orders = [];

                    res.data.forEach(function(row) {
                        orders.push(
                            <tr key={row.purchased}>
                                <td data-title="Asset">{ row.coin }</td>
                                <td data-title="Amount">{ row.amount }</td>
                                <td data-title="Price">{ row.price }</td>
                                <td data-title="Currency">{ row.currency }</td>
                                <td data-title="Total cost">{ row.total }</td>
                                <td data-title="Purchased">{ row.purchased }</td>
                            </tr>
                        );
                    });
                    that.setState({
                        orders: orders
                    });
                });
        }
    }

    render() {
        return (
            <main>
                <div className="page-heading">
                    <h1>My Orders</h1>
                </div>
                <article>
                    <div className="column">
                        <div className="column-1">
                            <table className="results">
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Amount</th>
                                        <th>Price</th>
                                        <th>Currency</th>
                                        <th>Total cost</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.orders }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </article>
            </main>
        );
    }
}

export default Orders;
