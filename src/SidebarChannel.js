import React, { useState, useEffect } from 'react'
import {database} from './firebase'
import { useDispatch } from 'react-redux'
import { Avatar } from '@material-ui/core'
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
        // <div className='sidebarChannel'>
        //     <h4><Avatar alt={channelData.channelName} src="/broken-image.jpg" />{channelData.channelName}</h4>
        // </div> : <></>
        <div className='sidebarChannel' onClick={() => dispatch(setChannelInfo({
            channelId: id,
            channelName: channelData.channelName
        }))} >
            <h4><Avatar alt={channelData.channelName} src="/broken-image.jpg" />{channelData.channelName}</h4>
        </div> : <></>
    )
}

export default SidebarChannel
