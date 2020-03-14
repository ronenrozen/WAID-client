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
            currentUser: {},
            lastAddedUSer: {}
        };

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
        this.setState({show: false, currentUser: {}}, ()=> this.updateTable());
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

    handleAdd = (data) => {
        this.setState({lastAddedUSer: data},()=> this.updateTable());

    };

    updateTable = async () => {
        try {
            const {data} = await userAxios.get(`/getall`);
            this.setState({usersList: data})
        } catch (error) {
            console.log('error on delete', error);
        }
    };
    handleDelete = async () => {
        try {
            const {status} = await userAxios.delete(`/delete/${this.state.currentUser.id}`);
            if (status) {
                this.hideModal()
            } else {
                this.setState({status: 500});
            }
        } catch (error) {
            console.log('error on delete', error);
        }
    };

    handleCurrentUser = (e) => {
        this.setState({
            currentUser: {
                ...this.state.currentUser,
                [e.target.name]: e.target.value
            }
        });
    };

    handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const {status} = await userAxios.put(`/update/${this.state.currentUser.id}`, this.state.currentUser);
            if (status) {
                this.hideModal()
            } else {
                this.setState({status: 500});
            }
        } catch (error) {
            console.log('error on delete', error);
        }
    };

    render() {
        return (
            <div>
                <AddUser handleAdd={this.handleAdd}/>
                <table className="container table table-striped mt-5">
                    <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    {this.state.usersList && <tbody>{this.state.usersList.map(user => this.createTable(user))}</tbody>}
                </table>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <EditUser handleClose={this.hideModal} handleCurrentUser={this.handleCurrentUser}
                              user={this.state.currentUser} delete={this.handleDelete} update={this.handleUpdate}/>
                </Modal>
            </div>
        )
    }
}

export default Users