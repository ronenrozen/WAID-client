import React, { Component } from 'react'
import User from './User'
import AddUser from './AddUser'
import EditUser from './EditUser'
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

    createTable = (user) => {
        return (<User
            key={user.id}
            id={user.id}
            username={user.username}
            email={user.mail}
            role={user.role} />)
    }


    render() {
        return (
            <div>
                <AddUser />
                <table className = "container table table-striped mt-5">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    {this.state.usersList && <tbody>{this.state.usersList.map(user => this.createTable(user))}</tbody>}
                </table>
                <EditUser />
            </div>
        )
    }
}

export default Users