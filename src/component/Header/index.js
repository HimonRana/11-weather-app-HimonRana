import React, { Component } from 'react';
import logo from './logo.svg';

import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="jumbotron mb-3">
                <img  src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">WETHER</h1>
            </div>
        )
    }
}

export default Header;