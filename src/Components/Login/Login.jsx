import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  inputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className={"wrapperContainer"}>
        <div className="innerContainer">
          <h1 className={"header"}>Welcome</h1>
          <form onSubmit={this.onSubmit}>
            <div className={"input"}>
              <i className={"fa fa-user"} />
              <input
                type="text"
                placeholder={"User Name"}
                name={"userName"}
                onChange={this.inputChange}
              />
            </div>
            <div className={"input"}>
              <i className={"fa fa-unlock"} />
              <input
                type="password"
                placeholder={"Password"}
                name={"password"}
                onChange={this.inputChange}
              />
            </div>
            <Link to={"/control-panel"} className={"text-center"}>
              <input type={"submit"} value={"Login"} />
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
