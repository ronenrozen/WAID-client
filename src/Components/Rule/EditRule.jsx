import React, { Component } from 'react'
const axios = require('axios')
export default class Rule extends Component {
    constructor(props){
        super(props);
        this.state = {
            rule: props.rule,
            type :props.type,
            action : props.action,
            status: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDelete = () => {
        axios.delete(`http://localhost:5000/rule/delete/${this.props.id}`)
        .then(response =>  {
            if(response.status === 200)
                this.setState({status : 200})
            else
                this.setState({status : 500})
        })
    }
    render() {
        return (
            <>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                    Edit
                </button>
                <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Edit Rule</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="RuleLabel">Rule</label>
                                        <input type="text" className="form-control" aria-describedby="RuleHelp" name={"rule"} value={this.state.username} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="TypeLabel">Rule Type</label>
                                        <select className="form-control" name={"type"} onChange={this.handleChange} value={this.state.type}>
                                            <option>XSS</option>
                                            <option>SQL Injection</option>
                                        </select>                                
                                    <div className="form-group">
                                        <label htmlFor="ActionLabel">Action</label>
                                        <select className="form-control" name={"action"} onChange={this.handleChange} value={this.state.action}>
                                            <option>Allow</option>
                                            <option>Blocked</option>
                                        </select>
                                    </div>
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

