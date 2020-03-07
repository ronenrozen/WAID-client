import React, {Component} from 'react'
import User from './User'
import AddUser from './AddUser'
import userAxios from "./userAxios";
import Modal from '../Modal/Modal'
import EditUser from "./EditUser";

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            show: false,
            currentUser: {}
        }
    }


    componentDidMount = async () => {
        try {
            const {data} = await userAxios.get(`/getall`);
            this.setState({usersList: data})
        } catch (error) {
            console.log('error on delete', error);
        }
    };

    showModal = () => {
        this.setState({show: true});
    };

    hideModal = () => {
        this.setState({show: false, currentUser: {}});
    };

    createTable = (user) => {
        return (<User
            key={user.id}
            id={user.id}
            username={user.username}
            email={user.mail}
            role={user.role}
            edit={this.handleEdit}/>)
    };

    handleEdit = (user) => {
        this.setState({currentUser: user});
        this.showModal()
    };

    render() {
        return (
            <div>
                <AddUser/>
                <table className="container table table-striped mt-5">
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
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <EditUser handleClose={this.hideModal} user={this.state.currentUser}/>
                </Modal>
            </div>
        )
    }
}

export default Users