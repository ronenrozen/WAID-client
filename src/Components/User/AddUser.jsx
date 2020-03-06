import React, {Component} from 'react'
import userAxios from './userAxios'
import Input from '../Utils/Input'
import Select from '../Utils/Select'


export default class AddUser extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            role: "",
            password: "",
            status: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    componentDidUpdate = () => {
        console.log('updated, current state is: ', this.state);
    };

    handleAdd = async () => {
        if (this.state.username !== "" && this.state.email !== "" && this.state.password !== "" && this.state.role !== "") {
            let intRole = this.convertRoleToInt();
            let data = {
                username: this.state.username,
                password: this.state.password,
                mail: this.state.email,
                role: intRole
            };
            try {
                await userAxios.post('adduser', data);
                console.log('add user is finished');
                console.log('this is the state before: ', this.state);
                this.clearState();
                console.log('clear is finished');
                console.log('this is the state after: ', this.state);
            } catch (error) {
                console.log('error on add user', error);
            }
        } else
            this.setState({status: -1})

    };

    clearState = () => {
        this.setState({
            ...this.state,
            username: "",
            email: "",
            role: "",
            password: "",
            status: ""
        });
    };

    convertRoleToInt = () => {
        let role = this.state.role;
        if (role === "admin")
            return 0;
        else
            return 1;
    };

    render() {
        return (
            <div className='container'>
                <h1 className="text-center">Add New User</h1>
                <form className="container">
                    <div className="form-group">
                        <Input
                            label="Username"
                            type="username"
                            name="username"
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                        />
                    </div>

                    {this.state.status === 403 && <small>password or mail are not in the right format</small>}
                    <div className="form-group">
                        <Select
                            label="Role"
                            options={[{key: "Empty", value: ""}, {key: "admin", value: "Admin"}, {
                                key: "readonly",
                                value: "Read Only"
                            }]}
                            name="role"
                            defaultValue="empty"
                            className="form-control"
                            onChange={this.handleChange}/>
                    </div>
                    <button type="button" onClick={this.handleAdd}
                            className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect">Add
                    </button>
                </form>
            </div>
        )
    }
}
