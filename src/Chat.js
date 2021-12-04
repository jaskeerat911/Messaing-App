import React from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";

const Chat = () => {
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);

    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />
            <ChatBody channelId={channelId} channelName={channelName}/>
        </div>
    );
};

export default Chat;
