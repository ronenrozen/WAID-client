import React, { Component } from 'react'
import Rule from './Rule'
import AddRule from './AddRule'
export default class Rules extends Component {


    constructor() {
        super()
        this.state = {
            rulesList: []
        }
    }


    componentDidMount() {
        fetch('http://localhost:5000/rule/getall')
            .then(response => response.json())
            .then(rules => { this.setState({ rulesList: rules }) });
    }

    createTable = (rule) => {
        return (<Rule
            key={rule.id}
            id={rule.id}
            rule={rule.rule}
            type={rule.type}
            action={rule.action} />)
    }

    render() {
        return (
            <div>
                <AddRule />
                <table className="container table table-striped mt-5">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Rule</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {this.state.rulesList && <tbody>{this.state.rulesList.map(rule => this.createTable(rule))}</tbody>}
                </table>
            </div>
        )
    }
}
