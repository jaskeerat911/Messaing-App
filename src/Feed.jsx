import React, { useState, useEffect, useContext } from 'react'
import { database } from './firebase';
import SideBar from "./Sidebar"
import Chat from './Chat';
import './feed.css'
import { AuthContext } from './AuthProvider';

function Feed() {
    return (
        <div className= 'feed'>
            <SideBar />
            <Chat />
        </div>
    )
}

export default Feed
