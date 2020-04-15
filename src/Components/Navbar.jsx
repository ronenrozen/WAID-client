import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div className="mb-4">
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link className="navbar-brand" to={'/control-panel'}>Waid</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/users"}>Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/rules"}>Rules</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/demo"}>WAID Demo</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"} onClick={this.props.logout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
