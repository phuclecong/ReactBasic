import React, { Component } from 'react';
import './style.css';

class Welcome extends Component {
    render() {
        return (
            <div className="welcome">
                <h1 className="welcome__header">
                    Hello! {this.props.name}
                </h1>
                <p className="welcome__message">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
            </div>

        )
    }
}

export default Welcome;
