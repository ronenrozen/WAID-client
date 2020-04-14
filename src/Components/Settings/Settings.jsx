import React, {Component} from 'react'
import confAxios from "./confAxios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faToggleOn, faToggleOff} from '@fortawesome/free-solid-svg-icons'
import './settings.css'
import Select from "../Utils/Select";
import Input from "../Utils/Input";
import Button from "../Utils/Button";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            isClient: '',
            serverUrl: '',
        };

    }

    componentDidMount = async () => {
        try {
            const {data} = await confAxios.get(`/get_all`);
            console.log("data",data);
            this.setState({
                isActive: data["is_active"] === 'True',
                isClient: data["is_client"] === 'True',
                serverUrl: data["server_url"],
            },()=> console.log(this.state))
        } catch (error) {
            console.log('error on getting is active', error);
        }

    };


    handleGetConfig = async () => {
        try {
            const {data} = await confAxios.get(`/get_all`);
            this.setState({
                isActive: data["is_active"] === 'True',
                isClient: data["is_client"] === 'True',
                serverUrl: data["server_url"],
            })
        } catch (error) {
            console.log('error on updating state', error);
        }
    };


    handleServerUrl = (e) => {
        console.log("handleServerUrl - ", e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    handleServeClient = (e) => {
        let value = e.target.value === '1';
        this.setState({
            [e.target.name]: value
        }, async () => {
            let newValue = (this.state.isClient).toString();
            try {
                const {status} = await confAxios.post('/set_is_client', {is_client: newValue.replace(/^\w/, c => c.toUpperCase())});
                if (status === 200)
                    this.handleGetConfig()
            } catch (error) {
                console.log('error on setting is client', error);
            }
        })
    };

    handleIsActive = () => {
        let value = !this.state.isActive;
        this.setState({
            isActive: value
        }, async () => {
            let newValue = (this.state.isActive).toString();
            console.log("newValue", newValue);
            try {
                const {status} = await confAxios.post('/set_is_active', {is_active: newValue.replace(/^\w/, c => c.toUpperCase())});
                if (status === 200)
                    this.handleGetConfig()
            } catch (error) {
                console.log('error on setting is client', error);
            }
        })
    };


    handleServerUrlSend = async () => {
        try {
            const {status} = await confAxios.post('/set_server_url', {server_url: this.state.serverUrl});
            if (status === 200)
                this.handleGetConfig()
        } catch (error) {
            console.log('error on setting is active', error);
        }
    };

    render() {
        const showServerUrl = !this.state.isClient;
        const isActiveIcon =  this.state.isActive ? faToggleOn : faToggleOff;
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
                        <td>
                            <FontAwesomeIcon size={'2x'} icon={isActiveIcon}
                                             onClick={this.handleIsActive}/>
                        </td>
                    </tr>
                    <tr>
                        <td>server or client</td>
                        <td><Select
                            label=""
                            options={[
                                {key: "0", value: "Server"},
                                {key: "1", value: "Client"}
                            ]}
                            name="isClient"
                            defaultValue={this.state.isClient ? 1 : 0}
                            className="custom-select custom-select-sm"
                            onChange={this.handleServeClient}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Server address</td>
                        <td><Input
                            label={""}
                            type={"text"}
                            name={"serverUrl"}
                            value={this.state.serverUrl}
                            tooltip={"Enter server address here"}
                            change={this.handleServerUrl}
                            disabled={showServerUrl}
                        />
                            <Button
                                type={"button"}
                                onClick={this.handleServerUrlSend}
                                value={"Update"}
                                className={"btn btn-info btn-rounded btn-block z-depth-0 my-4 waves-effect"}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>


        )
    }
}

export default Settings