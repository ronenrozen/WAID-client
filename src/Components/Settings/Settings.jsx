import React, {Component} from 'react'
import confAxios from "./confAxios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faToggleOn, faToggleOff} from '@fortawesome/free-solid-svg-icons'
import './settings.css'
import Select from "../Utils/Select";
import Input from "../Utils/Input";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            isServer: true,
            settings: []
        };

    }

    // componentDidMount = async () => {
    //     try {
    //         const {data} = await confAxios.get(`/is_active`);
    //         this.setState({isActive: data["is_active"].toLowerCase()}, () => console.log(this.state))
    //     } catch (error) {
    //         console.log('error on getting is active', error);
    //     }
    // };
    
    componentDidMount = async () => {
        try {
            const {data} = await confAxios.get(`/get_all`);
            this.setState({settings:data}, () => this.state);
        } catch (error) {
            console.log('error on getting is active', error);
        }
    };

    getIsActive = async () => {
        try {
            const {data} = await confAxios.get(`/is_active`);
            this.setState({isActive: data["is_active"].toLowerCase()})
        } catch (error) {
            console.log('error on updating is active', error);
        }
    };


    changeIsActive = async () => {
        let newValue = (this.state.isActive !== 'true').toString();

        try {
            const {status} = await confAxios.post('/set_is_active', {is_active: newValue.replace(/^\w/, c => c.toUpperCase())});
            if (status === 200)
                this.setState({isActive: newValue}, () => this.getIsActive())
        } catch (error) {
            console.log('error on setting is active', error);
        }
    };

    setActiveIcon = () => {

        console.log("this.state.isActive ? faToggleOn : faToggleOff" ,this.state);
        return (
            <div className="isActiveIcon">
                <FontAwesomeIcon size={'2x'} icon={this.state.settings.CLIENT.is_active.toLowerCase() === 'true' ? faToggleOn : faToggleOff}
                                 onClick={this.changeIsActive}/>
            </div>
        );

    };

    addServerInfo = () => {
        return (
            <tr>
                <td><p>Server address</p></td>
                <td><Input
                    label={""}
                    type={"text"}
                    name={"serverAddress"}
                    value={""}
                    tooltip={"Enter server address here"}
                />
                </td>
            </tr>
        );
    };

    render() {
        return (
            <div>
                <div className="header text-center">
                    <h1>WAID - Setting Panel</h1>
                </div>
                <table className="container table table-striped mt-5">
                    <thead className="thead-dark">
                    <tr>
                        <th>Option</th>
                        <th>Choice</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><p>Here you can stop the system from monitoring the traffic</p></td>
                        <td>{this.state.settings.length > 0} && {this.setActiveIcon()}</td>
                    </tr>
                    <tr>
                        <td>server or client</td>
                        <td><Select
                            label=""
                            options={[
                                {key: "0", value: "Server"},
                                {key: "1", value: "Cilent"}
                            ]}
                            name="action"
                            defaultValue={this.state.isServer === 'true' ? 0 : 1}
                            className="custom-select custom-select-sm"
                            onChange={(e) => console.log(e.target)}/>
                        </td>
                    </tr>
                    {this.state.isServer === false ? this.addServerInfo() : null}
                    </tbody>
                </table>

            </div>


        )
    }
}

export default Settings