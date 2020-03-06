import React, {Component} from 'react'
import userAxios from './userAxios';
import Button from "../Utils/Button";
import Input from "../Utils/Input";

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            role: "",
            status: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleDelete = async () => {
        console.log("HandleDelete", this.props.id);
        try {
            const {status} = await userAxios.delete(`/delete/${this.props.id}`);
            if (status) {
                this.setState({status: 200});
            } else {
                this.setState({status: 500});
            }
        } catch (error) {
            console.log('error on delete', error);
        }
    };

    render() {
        this.setState({id:this.props.id});
        return (
            <>
                <div className={"container"}>
                    <div className={"modal-header"}>
                        <h5 className="modal-title">Edit User</h5>
                    </div>
                    <form>
                        <Input
                            label="Username"
                            type="username"
                            name="username"
                            value={this.props.user.username}
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={this.props.user.email}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                            anyone else.</small>
                        <div className="form-group">
                            <label htmlFor="RoleLabel">Role</label>
                            <select className="form-control" name={"role"} onChange={this.handleChange}
                                    value={this.state.role ? this.state.role : this.props.user.role}>
                                <option>Admin</option>
                                <option>Read Only</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <Button
                        type={"button"}
                        value={"Close"}
                        className={"btn btn-secondary"}
                        onClick={this.props.handleClose}/>
                    <Button
                        type={"button"}
                        value={"Delete"}
                        className={"btn btn-danger"}
                        onClick={this.handleDelete}/>
                    <Button
                        type={"button"}
                        value={"Update"}
                        className={"btn btn-primary"}/>
                </div>
            </>
        );
    }
}




