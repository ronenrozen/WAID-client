import React, { Component } from 'react'
import userAxios from './userAxios';

export default class EditUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            email :"",
            role : "",
            status: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDelete = async () => {
        try {
            const { status } = await userAxios.delete(`/delete/${this.props.id}`);
            if (status) {
                this.setState({status : 200});
            } else {
                this.setState({status : 500});
            }
        } catch (error) {
            console.log('error on delete', error);
        }
    }
    render() {
        return (
            <>
                {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                    Edit
                </button> */}
                <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Edit User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="UsernameLabel">Username</label>
                                        <input type="username" className="form-control" aria-describedby="UsernameHelp" name={"username"} value={this.state.username ? this.state.username:this.props.username} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="EmailLabel">Email address</label>
                                        <input type="email" className="form-control" aria-describedby="emailHelp" name={"email"} value={this.state.email ?this.state.email: this.props.email} onChange={this.handleChange} />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="RoleLabel">Role</label>
                                        <select className="form-control" name={"role"} onChange={this.handleChange} value={this.state.role ? this.state.role : this.props.role}>
                                            <option>Admin</option>
                                            <option>Read Only</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                                <button type="button" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

