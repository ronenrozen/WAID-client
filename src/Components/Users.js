import React, { Component } from 'react'
import User from './User'
class Users extends Component {

    constructor() {
        super()
        this.state = {
            usersList: []
        }
    }


    componentDidMount() {
        fetch('http://localhost:5000/user/getall')
            .then(response => response.json())
            .then(users => { this.setState({ usersList: users }) });
    }

    createTable = () => {
        if(this.state.usersList > 0){
            let table = []
            for (let i = 0; i < this.state.usersList.length; i++) {
                let children = []
                children.push(<User
                    key={i}
                    username={this.state.usersList[i].id}
                    password={this.state.usersList[i].name}
                    email={this.state.usersList[i].email}
                    role={this.state.usersList[i].role} />)
                table.push(<tr>{children}</tr>)
            }
            return table
        }
    }


    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>password</th>
                        <th>email</th>
                        <th>role</th>
                    </tr>
                </thead>
                {this.state.usersList && <tbody>{this.createTable()}</tbody>}
            </table>
        )
    }
}

export default Users