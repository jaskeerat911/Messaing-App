import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { database } from "./firebase";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "./SignUp.css";

function SignUp() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [username, setUsername] = useState("");
    let [region, setRegion] = useState("");
    let [loader, setLoader] = useState(false);
    let history = useNavigate();

    let { genericSignup } = useContext(AuthContext);

    const signupFn = async () => {
        try {
            setLoader(true);
            let userCredential = await genericSignup(email, password);
            let uid = userCredential.user.uid;

            database.users.doc(uid).set({
                userId: uid,
                email: email,
                username: username,
                region : region
            });

            history("/feed");
        } catch (err) {
            setLoader(false);
            setEmail("");
            setUsername("");
            setPassword("");
            setRegion("");
        }
    };

    return loader ? (
        <Loader></Loader>
    ) : (
        <div className="signup__container">
            <div className="signup">
                <div className="signup__header">
                    <h2>Create an Account</h2>
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
                        <h4>UserName</h4>
                        <input
                            type="text"
                            value={username}
                            onChange={function (e) {
                                setUsername(e.target.value);
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
                    <div className="input__field">
                        <h4>Region</h4>
                        <input
                            type="text"
                            value={region}
                            onChange={function (e) {
                                setRegion(e.target.value);
                            }}
                        />
                    </div>
                    <div className="button__container">
                        <Button id="logIn" onClick={signupFn}>
                            Sign Up
                        </Button>
                    </div>
                </div>
                <div>
                    <NavLink to="/login">Already have an account?</NavLink>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
