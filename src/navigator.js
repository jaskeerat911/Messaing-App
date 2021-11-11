import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Feed from "./Feed";
import AuthProvider, { AuthContext } from "./AuthProvider";

function navigator() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route exact path="/feed" element={<PrivateRoute />}>
                        <Route exact path="/feed" element={<Feed />} />
                    </Route>
                    <Route path="/" element={<Navigate replace to="/login" />}></Route>
                </Routes>
            </AuthProvider>
        </>
    );
}

function PrivateRoute({ children }) {
    let { currentUser } = useContext(AuthContext);

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default navigator;
