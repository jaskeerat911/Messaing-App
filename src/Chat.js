import React, { useContext } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmojiEmoticonsIcon from "@material-ui/icons/EmojiEmotions";
import { useState } from "react";
import { useEffect } from "react";
import { database } from "./firebase";
import firebase from "firebase";
import { Avatar } from "@material-ui/core";
import { AuthContext } from "./AuthProvider";
import AddIcon from "@material-ui/icons/Add";

const Chat = () => {
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    let [user, setUser] = useState(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

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

            database.channels.doc(channelId).onSnapshot((snapshot) => {
                setUsers(snapshot.data().users);
            });
        }

        database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUser(doc.data());
        });
    }, [channelId, users]);


    const sendMessage = (e) => {
        e.preventDefault();

        database.channels.doc(channelId).collection("messages").add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };

    const handleAddUser = (e) => {
        e.preventDefault();


        const userName = prompt("Enter a new user name");

        database.users.get().then((doc) => {
            const documents = doc.docs.map((doc) => doc.data());
            let flag = false;
            documents.forEach((ele) => {
                if (userName === ele.username) {
                    let updatedUsers = [...users, ele];
                    database.channels.doc(channelId).update({
                        users: updatedUsers,
                    });

                    flag = true;
                    return 
                } 
            });

            if (!flag) {
                alert("User does not exist")
            }

        });

    };


    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />
            <div className="chat__body">
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

                <div className="channel__description">
                    {channelId ? (
                        <>
                            <div className="channel__title">
                                <Avatar alt={channelName} src="/broken-image.jpg" />
                                <h1>{channelName}</h1>
                                <AddIcon className="channel__addUser" onClick={handleAddUser} />
                            </div>
                            <div className="channel__users">
                                {/* {console.log(users)} */}
                                {users ? users.map((user) => (
                                    // console.log(user)
                                    <div className="user">
                                        <Avatar alt={user.username} src="/broken-image.jpg" />
                                        <span>{user.username}</span>
                                    </div>
                                )) : <></>}
                            </div>{" "}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
