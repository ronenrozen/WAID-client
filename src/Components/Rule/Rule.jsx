import React, {Component} from 'react';
import Button from '../Utils/Button'

class Rule extends Component {
    handleEdit = () => {
        const {edit} = this.props;
        edit(this.props)

    };

    render() {
        const {id, rule, type, action} = this.props;

        return (
            <tr>
                <td>{id}</td>
                <td>{rule}</td>
                <td>{type}</td>
                <td>{action}</td>
                <td>
                    <Button
                        type={"button"}
                        value={"Edit"}
                        className={"btn btn-primary btn-rounded"}
                        dataToggle={"modal"}
                        dataTarget={"#staticBackdrop"}
                        onClick={this.handleEdit}/>
                </td>
            </tr>
        );
    }
}


export default Rule;