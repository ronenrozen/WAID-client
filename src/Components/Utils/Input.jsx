import React, {Component} from 'react';

export default class Input extends Component {
    // constructor(props) {
    //     super(props);
    //     console.log("Input",props);
    //     this.state = {
    //         value: ""
    //     }
    // }

    // handleChange = (e) => {
    //     this.props.change(e);
    //     this.setState({value: e.target.value})
    // };

    render() {
        const {label, type, name,value,tooltip} = this.props;
        return (
            <div className="form-group">
                <label>{label}</label>
                <input type={type} className="form-control rounded" name={name} onChange={this.props.change}
                       value={value} title={tooltip}/>
            </div>
        );
    };
}