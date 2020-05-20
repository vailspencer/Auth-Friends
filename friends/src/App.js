import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <div className="App">
            <Switch>
                <PrivateRoute exact path="/protected" component={FriendsList} />
                <Route path="/login" component={Login} />
                <Redirect to="/login" />
            </Switch>
        </div>
    );
}

export default App;