import React, { useState, useEffect } from 'react'
import {database} from './firebase'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from './features/appSlice'
import './SidebarChannel.css'

const SidebarChannel = ({ id }) => {
    const dispatch = useDispatch()
    let [channelData, setChannelData] = useState(null);

    useEffect(() => {
        database.channels.doc(id).onSnapshot((doc) => {
            setChannelData(doc.data())
        })
    }, [])


    return (
        channelData ? 
        <div className='sidebarChannel' onClick={() => dispatch(setChannelInfo({
            channelId: id,
            channelName: channelData.channelName
        }))} >
            <div><h1>#</h1>{channelData.channelName}</div>
        </div> : <></>
    )
}

export default SidebarChannel
