import React, { useState, useEffect, useContext } from 'react'
import SideBar from "./Sidebar"
import Chat from './Chat';
import './feed.css'
import { database } from "./firebase";
import { AuthContext } from './AuthProvider';
import Loader from "./Loader"

function Feed() {
    let [user, setUser] = useState(null);
    let { currentUser } = useContext(AuthContext);

    useEffect(() => {
        database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUser(doc.data());
        })
    }, [currentUser])
    return (
        user ? 
            <div className= 'feed'>
                <SideBar user ={user} />
                <Chat user = {user} />
            </div> :
            <Loader/>
    )
}

export default Feed
