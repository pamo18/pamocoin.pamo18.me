/*eslint max-len: ["error", { "code": 300 }]*/

import React, { Component } from 'react';
import auth from '../../models/auth.js';
import base from '../../config/api.js';
import io from 'socket.io-client';
import utils from '../../models/utils.js';
import Rickshaw from 'rickshaw';
import 'rickshaw/rickshaw.min.css';

const socket = io(base.stocks());
const api = base.api();

class Trade extends Component {
    constructor(props) {
        super(props);
        this.startStocks = this.startStocks.bind(this);
        this.graphPicker = this.graphPicker.bind(this);
        this.getCoins = this.getCoins.bind(this);
        this.getWallet = this.getWallet.bind(this);
        this.showWallet = this.showWallet.bind(this);
        this.updateSelectedCoin = this.updateSelectedCoin.bind(this);
        this.updateSelectedWallet = this.updateSelectedWallet.bind(this);
        this.updateAmount = this.updateAmount.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
        this.message = this.message.bind(this);
        this.simulateGraph = this.simulateGraph.bind(this);
        this.trade = this.trade.bind(this);
        this.buy = this.buy.bind(this);
        this.sell = this.sell.bind(this);
        this.state = {
            trade: "",
            wallet: "",
            coins: "",
            coinOptions: "",
            walletOptions: "",
            selectedCoin: "pamocoin",
            selectedWallet: "krona",
            stocks: "",
            amount: 1.00,
            price: 0.00,
            total: 0.00,
            first: true,
            active: false,
            buySell: "buy",
            graphs: "",
            message: ""
        };
    }

    componentDidMount() {
        let that = this;

        auth.isactive()
            .then(function(res) {
                if (res.data.active) {
                    that.setState({
                        active: true
                    });
                    that.getWallet();
                } else {
                    that.setState({
                        active: false
                    });
                }
            })
            .then(() => this.startStocks());
    }

    startStocks() {
        let that = this,
            graphs = {},
            resize;

        const graphContainer = document.getElementById("graphs");

        socket.on('connect', function() {
            console.info("Connected to stocks");
            socket.emit('current');
        });

        socket.on('disconnect', function() {
            console.info("Disconnected from stocks");
        });

        socket.on('stocks', function(stocks) {
            if (that.state.first) {
                let count = 1,
                    allGraphs = [],
                    palette = new Rickshaw.Color.Palette({ scheme: 'munin' });

                stocks.map((stock) => {
                    let graphTitle = document.createElement("h2");

                    graphTitle.textContent = stock.name;
                    graphTitle.id = "graph-title-" + count;
                    graphTitle.classList.add("graph-title");

                    let graphOuter = document.createElement("div");

                    graphOuter.id = "rickshaw_graph_outer-" + count;
                    graphOuter.classList.add("rickshaw_graph_outer");

                    let graphElement = document.createElement("div");

                    if (count > 1) {
                        graphOuter.classList.add("hide");
                        graphTitle.classList.add("hide");
                    }

                    allGraphs.push(
                        <button
                            key={"graph-button-" + count}
                            id={"graph-button-" + count}
                            className={ count === 1 ? "toggle-button graph-selected" : "toggle-button" }
                            name="graph-button"
                            value={count}
                            onClick={that.graphPicker}>{stock.name}</button>
                    );

                    count ++;

                    graphOuter.appendChild(graphElement);
                    graphContainer.appendChild(graphTitle);
                    graphContainer.appendChild(graphOuter);
                    let d = new Date();

                    d.setHours(d.getHours() + 1);

                    let graph = new Rickshaw.Graph({
                        element: graphElement,
                        width: graphContainer.clientWidth - 100,
                        height: "300",
                        renderer: "area",
                        series: new Rickshaw.Series.FixedDuration([{
                            name: stock.name,
                            color: palette.color(),
                        }], undefined, {
                            timeInterval: 5000,
                            maxDataPoints: 1000,
                            timeBase: d.getTime() / 1000
                        })
                    });

                    resize = function() {
                        let containerWidth = graphContainer.clientWidth || 930;

                        graph.configure({
                            width: containerWidth - 100,
                            height: "300",
                        });
                        graph.render();
                    };

                    resize();

                    window.addEventListener('resize', resize);

                    new Rickshaw.Graph.Axis.Time({
                        graph: graph
                    });

                    new Rickshaw.Graph.Axis.Y({
                        graph: graph,
                        orientation: 'right',
                        tickFormat: Rickshaw.Fixtures.Number.formatKMBT
                    });

                    new Rickshaw.Graph.HoverDetail({
                        graph: graph
                    });

                    graph.render();

                    let slug = utils.slugify(stock.name);

                    graphs[slug] = {
                        name: stock.name,
                        graph: graph,
                    };
                    return true;
                });

                that.setState({
                    graphs: allGraphs,
                    first: false
                });
            }

            stocks.map((stock) => {
                let slug = utils.slugify(stock.name),
                    data = {};

                data[stock.name] = stock.price;
                graphs[slug].graph.series.addData(data);
                graphs[slug].graph.render();

                return true;
            });

            that.setState({
                stocks: stocks
            }, () => that.updateTotal());
        });
    }

    graphPicker(e) {
        let graph = document.getElementById("rickshaw_graph_outer-" + e.target.value),
            graphTitle = document.getElementById("graph-title-" + e.target.value),
            graphButton = document.getElementById("graph-button-" + e.target.value);

        graph.classList.toggle("hide");
        graphTitle.classList.toggle("hide");
        graphButton.classList.toggle("graph-selected");
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
                    }, () => that.getCoins());
                });
        }
    }

    getCoins() {
        let that = this;

        fetch(api + "/coins")
            .then(res => res.json())
            .then(function(res) {
                let coinOptions = [],
                    coins = res.data;

                res.data.forEach(function(row) {
                    coinOptions.push(
                        <option key={ row.name } value={ row.name }>{ row.label + " (" + that.state.wallet[row.name] + " Purchased)" }</option>
                    );
                });
                that.setState({
                    coinOptions: coinOptions,
                    coins: coins
                }, () => that.showWallet());
            });
    }

    showWallet() {
        socket.emit('current');
        let that = this,
            walletOptions = [<option key="krona" value="krona">{"Krona (" + this.state.wallet["krona"] + ":- Available)"}</option>];

        this.state.coins.forEach(function(coin) {
            if (coin.name !== that.state.selectedCoin) {
                walletOptions.push(
                    <option key={ coin.name } value={ coin.name }>{ coin.label + " (" + that.state.wallet[coin.name] + ")" }</option>
                );
            }
            that.setState({
                walletOptions: walletOptions
            });
        });
    }

    updateSelectedCoin(e) {
        this.setState({
            selectedCoin: e.target.value
        }, () => this.showWallet());
    }

    updateSelectedWallet(e) {
        this.setState({
            selectedWallet: e.target.value
        }, () => socket.emit('current'));
    }

    updateAmount(e) {
        this.setState({
            amount: e.target.value,
            message: ""
        }, () => this.updateTotal());
    }

    updateTotal() {
        let stocks = this.state.stocks,
            coin = this.state.selectedCoin,
            wallet = this.state.selectedWallet,
            amount = this.state.amount,
            that = this;

        stocks.forEach(function (stock) {
            if (stock.coin === coin && stock.currency === wallet) {
                return that.setState({
                    price: stock.price.toFixed(2),
                    total: (stock.price * amount).toFixed(2)
                });
            }
        });
    }

    message(text) {
        this.setState({
            message: <p className="form-label message">{text}</p>
        });
    }

    simulateGraph() {
        const graphContainer = document.getElementById("graphs");

        graphContainer.innerHTML = "";
        this.setState({
            first: true,
            graphs: ""
        }, () => socket.emit('simulate'));
    }

    trade(e) {
        e.preventDefault();
        const that = this;
        const data = new FormData(e.target);

        let transactionType = this.state.buySell,
            currentWallet,
            transaction,
            user = localStorage.getItem("activeUser"),
            profile = JSON.parse(user),
            username = profile.name,
            token = localStorage.getItem("token");

        token = JSON.parse(token);

        if (transactionType === "buy") {
            currentWallet = this.state.wallet[data.get('wallet').toLowerCase()];
            if (parseFloat(currentWallet) < parseFloat(data.get('total'))) {
                this.message("Not enough funds");
                return console.log("Not enough funds");
            }

            transaction = {
                "user": username,
                "coinIn": data.get('coin'),
                "amount": data.get('amount'),
                "coinOut": data.get('wallet'),
                "price": data.get('price'),
                "total": data.get('total')
            };
        } else if (transactionType === "sell") {
            currentWallet = this.state.wallet[data.get('coin').toLowerCase()];
            if (parseFloat(currentWallet) < parseFloat(data.get('amount'))) {
                this.message("Not enough funds");
                return console.log("Not enough funds");
            }

            transaction = {
                "user": username,
                "coinIn": data.get('wallet'),
                "amount": data.get('total'),
                "coinOut": data.get('coin'),
                "price": data.get('price'),
                "total": data.get('amount')
            };
        } else {
            return console.log("Not a valid transaction type");
        }

        fetch(api + "/trade", {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then(that.props.history.push('/orders'));
    }

    buy() {
        this.setState({
            buySell: "buy",
            message: ""
        });
    }

    sell() {
        this.setState({
            buySell: "sell",
            message: ""
        });
    }

    render() {
        return (
            <main>
                <div className="page-heading">
                    <h1>Trade</h1>
                </div>
                <article>
                    { this.state.active ?
                        <div className="column">
                            <div className="column-1">
                                <h2 className="center margin">Order form</h2>
                                <div className="form-wrapper">
                                    <form className="form-register small" onSubmit={this.trade}>
                                        <input
                                            className="check-input"
                                            type="hidden"
                                            name="price"
                                            value={this.state.price} />

                                        <input
                                            className="check-input"
                                            type="hidden"
                                            name="total"
                                            value={this.state.total} />

                                        <div className="trade-type">
                                            <button className={this.state.buySell === "buy" ? "toggle-button buy" : "toggle-button"} type="button" onClick={this.buy}>Buy</button>
                                            <button className={this.state.buySell === "sell" ? "toggle-button sell" : "toggle-button"} type="button" onClick={this.sell}>Sell</button>
                                        </div>

                                        <label className="form-label">Coin
                                            <select
                                                className="form-input"
                                                type="text"
                                                name="coin"
                                                onChange={this.updateSelectedCoin}>
                                                { this.state.coinOptions }
                                            </select>
                                        </label>

                                        { this.state.buySell === "buy" ?
                                            <label className="form-label">Wallet
                                                <select
                                                    className="form-input"
                                                    type="text"
                                                    name="wallet"
                                                    onChange={this.updateSelectedWallet}>
                                                    { this.state.walletOptions }
                                                </select>
                                            </label>
                                            :
                                            <input type="hidden" name="wallet" value="krona" />
                                        }

                                        <label className="form-label">Amount
                                            <input
                                                className="form-input"
                                                type="number"
                                                min="1.00"
                                                step=".01"
                                                name="amount"
                                                required
                                                value={this.state.amount}
                                                onChange={this.updateAmount}/>
                                        </label>

                                        <label className="form-label">Current Price
                                            <div className="form-input">{ this.state.price + " " + this.state.selectedWallet }</div>
                                        </label>

                                        <label className="form-label">Total
                                            <div className="form-input">{ this.state.total + " " + this.state.selectedWallet }</div>
                                        </label>

                                        <label className="form-label check-label">
                                            <input
                                                className="check-input"
                                                type="checkbox"
                                                name="finished"
                                                required />
                                            Are you sure?
                                        </label><br />

                                        { this.state.buySell === "buy" ?
                                            <input
                                                className="button center buy"
                                                type="submit"
                                                name="buy"
                                                value="Place order" />
                                            :
                                            <input
                                                className="button center sell"
                                                type="submit"
                                                name="sell"
                                                value="Place order" />
                                        }
                                        { this.state.message }
                                    </form>
                                </div>
                            </div>
                        </div>
                        : null
                    }

                    <div className="double-column ">
                        <div className="column-2">
                            <h2 className="center margin">Price Charts</h2>
                            <div className="graph-picker">
                                { this.state.graphs }
                            </div>
                            <div className="graphs" id="graphs"></div>
                            <div className="graph-picker simulate">
                                <button
                                    className="toggle-button"
                                    name="simulate-button"
                                    value="simulate"
                                    onClick={this.simulateGraph}>Simulate 500
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        );
    }
}

export default Trade;
