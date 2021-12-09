import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Message from "./Message";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import EmojiEmoticonsIcon from "@material-ui/icons/EmojiEmotions";
import SendIcon from '@material-ui/icons/Send';
import { database } from "./firebase";
import firebase from "firebase";

function Messages(props) {
    let { user } = props;
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    let [input, setInput] = useState("");
    let [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
            database.channels
                .doc(channelId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map((doc) => doc.data()));
                });
        }

    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();

        // database.channels.doc(channelId).collection("messages").add({
        //     message: input,
        //     user: user,
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // });

        console.log(input)

        setInput("");
    };

    return (
        <div className="chat__messages__body">
                    <div className="chat__messages">
                        {/* {messages.map((message) => {
                            console.log(message);
                        })} */}
                        {messages.map((message) => (
                            <Message
                                message={message.message}
                                timestamp={message.timestamp}
                                user={message.user}
                            />
                        ))}
                    </div>

                    {channelName ? 
                        <div className="chat__input">
                            <EmojiEmoticonsIcon fontSize="medium" />
                            <input
                                type="text"
                                disabled={!channelId}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Message #${channelName}`}
                            />
                            <SendIcon id="sendIcon" onClick ={sendMessage} onKeyDown ={sendMessage}/>
                        </div> : 
                        <></>    
                    }
                </div>
    )
}

export default Messages
