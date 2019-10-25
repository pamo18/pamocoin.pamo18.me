/*eslint max-len: ["error", { "code": 500 }]*/

import React, { Component } from 'react';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: ""
        };
    }

    render() {
        return (
            <main>
                <div className="page-heading">
                    <h1>About</h1>
                </div>
                <article>
                    <div className="column">
                        <div className="column-1">
                            <h2 className="center">PamoCoin Pro</h2>
                            <p>Denna webbsida är skapad av Paul Moreland och är en del av avslutningsprojektet kmom10 till kursen jsramverk hos Blekinge Tekniska Högskola.</p>
                            <p>Följande ramverk och verktyg används i detta Trading Platform:</p>
                            <h4>Server: <a href="https://expressjs.com">Express</a></h4>
                            <h4>Klient: <a href="https://reactjs.org">React</a></h4>
                            <h4>Real-time engine: <a href="https://socket.io">Socket.io</a></h4>
                            <h4>Database for Real-time engine: <a href="https://www.mongodb.com">MongoDB</a></h4>
                            <h4>Database for Servern: <a href="https://sqlitebrowser.org">SQLite</a></h4>
                        </div>
                    </div>
                </article>
            </main>
        );
    }
}

export default About;
