import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Message from "./Message";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import EmojiEmoticonsIcon from "@material-ui/icons/EmojiEmotions";
import SendIcon from '@material-ui/icons/Send';
import { database } from "./firebase";
import firebase from "firebase";
import { Picker } from "emoji-mart"
import "emoji-mart/css/emoji-mart.css";

function Messages(props) {
    let { user } = props;
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    let [input, setInput] = useState("");
    let [messages, setMessages] = useState([]);
    let [showEmojis, setShowEmojis] = useState(false);

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

        database.channels.doc(channelId).collection("messages").add({
            message: input,
            userId: user.userId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        console.log(input)
        setInput("");
    };

    const addEmoji = (e) => {
        let emojiCode = e.unified.split("-");
        let emoji = String.fromCodePoint("0x" + emojiCode);
        console.log(emoji)
        setInput(input + emoji)
    }

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
                                userId={message.userId}
                            />
                        ))}
                    </div>

                    {channelName ? 
                        <div className="chat__input">
                            <EmojiEmoticonsIcon className = "chat-icons" fontSize="medium" onClick={() => setShowEmojis(!showEmojis)}/>
                            {showEmojis && (
                                <div className="emoji-picker">
                                    <Picker onSelect={addEmoji} theme = "dark"/>
                                </div>
                            )}

                            <input
                                type="text"
                                disabled={!channelId}
                                value={input}
                                onClick={() => setShowEmojis(false)}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Message #${channelName}`}
                            />
                            <SendIcon className = "chat-icons" onClick ={sendMessage} onKeyDown ={sendMessage}/>
                        </div> : 
                        <></>    
                    }
                </div>
    )
}

export default Messages
