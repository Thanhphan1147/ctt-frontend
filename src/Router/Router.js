import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import './Router.css';

import App from "../App";
import Header from "../Header/Header";
import About from "../About/About";
import Login from "../Login/Login";
import Schedule from "../Schedule/Schedule";

function AppRouter() {
    const [user, setUser] = useState("");

    function loginCallback(childData) {
        // console.log(childData);
        setUser(childData);
    }

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user != null) {
            loginCallback(user);
        } else {
            console.log("null user")
        }
    })

    return (
        <div className="container-router">
            <Router>
                <Header user={user} key={user}/>
                <Switch>
                    <Route path="/schedule">
                        <Schedule/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/">
                        <App/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default AppRouter;
