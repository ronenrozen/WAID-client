import React, { Component } from 'react'
const axios = require('axios')
export default class AddRule extends Component {
    constructor() {
        super();
        this.state = {
            rule: "",
            type: "",
            action: "",
            status: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleAdd = () => {
        if (this.state.rule !== "" && this.state.type !== "" && this.state.action !== "") {
            let data = {
                "rule": this.state.rule,
                "type": this.state.type,
                "action": this.state.action,
            }
            axios.post('http://localhost:5000/rule/addrule', data)
                .then(this.clearState()).catch(error => {
                    console.log("error", error);
                    this.setState({ status: error.status })
                })
        }
        else
            this.setState({ status: -1 })

    }

    clearState = () => {
        this.setState({
            rule: "",
            type: "",
            action: "",
            status: ""
        })
    }

    convertRoleToInt = () => {
        let role = this.state.role;
        if (role === "admin")
            return 0
        else
            return 1
    }

    render() {
        return (
            <div className='conatiner'>
                <h1 className="text-center">Add New Rule</h1>
                <form className="container">
                    <div className="form-group">
                        <label htmlFor="RuleLabel">Rule Regex</label>
                        <input type="rule" className="form-control" aria-describedby="RuleHelp" name={"rule"} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="EmailLabel">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" name={"type"} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="RoleLabel">Action</label>
                        <select className="form-control" name={"role"} onChange={this.handleChange} defaultValue={'empty'}>
                            <option value="empty"></option>
                            <option value="allow">Allow</option>
                            <option value="block">Block</option>
                        </select>
                    </div>
                    <button type="button" onClick={this.handleAdd} className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect">Add</button>
                </form>
            </div>
        )
    }
}
