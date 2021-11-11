import { Button } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import firebase from "./firebase";
import { AuthContext } from "./AuthProvider";
import Loader from "./Loader";

const Login = (props) => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loginLoader, setLoginLoader] = useState(false);
    let history = useNavigate();

    let { genericlogin, currentUser } = useContext(AuthContext);

    const loginFn = async () => {
        try {
            setLoginLoader(true);
            await genericlogin(email, password);
            setLoginLoader(false);
            history("/feed");
        } catch (err) {
            setLoginLoader(false);
            setEmail("");
            setPassword("");
            setTimeout(() => {}, 2000);
        }
    };

    return loginLoader ? (
        <Loader></Loader>
    ) : (
        <div className="login__container">
            <div className="login">
                <div className="login__header">
                    <h2>Welcome Back!</h2>
                    <div>We're so excited to see you again</div>
                </div>
                <div className="input__container">
                    <div className="input__field">
                        <h4>Email</h4>
                        <input
                            type="email"
                            value={email}
                            onChange={function (e) {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="input__field">
                        <h4>Password</h4>
                        <input
                            type="password"
                            value={password}
                            onChange={function (e) {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="button__container">
                    <Button id="logIn" onClick={loginFn}>
                        Log In
                    </Button>
                </div>
                <div>
                    Need an account? <NavLink to="/signup">Register</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;
