import React from 'react'
import Messages from './Messages'
import ChannelDescription from './ChannelDescription'

function ChatBody(props) {
    return (
        <div className = 'chat__body'>
            <Messages user ={props.user} channelId={props.channelId} channelName={props.channelName} />
            <ChannelDescription channelId={props.channelId} channelName={props.channelName}/>
        </div>
    )
}

export default ChatBody
