import React, {Component} from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    handleChange = ({target}) => {
        console.log(target.value);
        this.setState({value: target.value})
    };

    render() {
        const {label, type, name,value} = this.props;
        return (
            <div className="form-group">
                <label>{label}</label>
                <input type={type} className="form-control" name={name} onChange={this.handleChange}
                       value={value ? value:this.state.value}/>
            </div>
        );
    };
}