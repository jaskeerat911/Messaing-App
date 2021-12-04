import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux';
import Message from "./Message";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmojiEmoticonsIcon from "@material-ui/icons/EmojiEmotions";
import { AuthContext } from './AuthProvider';
import { database } from "./firebase";
import firebase from "firebase";

function Messages() {
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    let [user, setUser] = useState(null);
    let [input, setInput] = useState("");
    let [messages, setMessages] = useState([]);

    let { currentUser } = useContext(AuthContext);

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

        database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUser(doc.data());
        });
    }, [channelId, currentUser]);

    const sendMessage = (e) => {
        e.preventDefault();

        database.channels.doc(channelId).collection("messages").add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

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

                    <div className="chat__input">
                        <AddCircleIcon fontSize="medium" />
                        <form>
                            <input
                                type="text"
                                disabled={!channelId}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Message #${channelName}`}
                            />
                            <button
                                className="chat__inputButton"
                                onClick={sendMessage}
                                disabled={!channelId}
                                type="submit"
                            ></button>
                        </form>

                        <div className="chat__inputIcon">
                            <EmojiEmoticonsIcon fontSize="medium" />
                        </div>
                    </div>
                </div>
    )
}

export default Messages
