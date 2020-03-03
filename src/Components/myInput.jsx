import React, {Component} from 'react';

export default class MyInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input2: ''
        }
    }

    handleChange = ({target}) => {
        console.log(target.value);
        this.setState({input2: target.value})
    }

    render() {
        const {htmlFor, label, type, ariadesribedy, name} = this.props;
        return(
            <div className="form-group">
                <label htmlFor={htmlFor}>{label}</label>
                <input type={type} className="form-control" aria-describedby={ariadesribedy} name={name} onChange={this.handleChange} value={this.state.input2}/>
            </div>
        );
    };
}