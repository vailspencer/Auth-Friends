  
import React from "react";

import { AxiosWithAuth } from "./utils/AxiosWithAuth";

class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: "",
        },
    };

    handleChange = (e) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value,
            },
        });
    };

    login = (e) => {
        e.preventDefault();
        AxiosWithAuth()
            .post("login", this.state.credentials)
            .then((res) => {
                console.log("Login.js: login: success: res: ", res);
                localStorage.setItem("token", res.data.payload);
                this.props.history.push("/protected");
            })
            .catch((err) => console.error(err));
    };

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <input
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button>Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;