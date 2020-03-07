import React, {Component} from 'react'
import userAxios from './userAxios';
import Button from "../Utils/Button";
import Input from "../Utils/Input";
import Select from "../Utils/Select";

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.user.username,
            email: props.user.email,
            role: props.user.role,
            status: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleDelete = async () => {
        try {
            const {status} = await userAxios.delete(`/delete/${this.props.user.id}`);
            if (status) {
                this.props.handleClose()
            } else {
                this.setState({status: 500});
            }
        } catch (error) {
            console.log('error on delete', error);
        }
    };

    render() {
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
                            value={this.state.username}
                            change={this.handleChange}
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={this.state.email}
                            change={this.handleChange}
                        />
                        <Select
                            label="Role"
                            options={[
                                {key: "0", value: "Admin"},
                                {key: "1", value: "Read Only"}
                            ]}
                            name="role"
                            defaultValue={this.state.role}
                            className="form-control"
                            onChange={this.handleChange}/>
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
        )
            ;
    }
}




