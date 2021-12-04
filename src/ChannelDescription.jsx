import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { database } from "./firebase";
import { selectChannelId, selectChannelName } from "./features/appSlice";


function ChannelDescription() {
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    let [users, setUsers] = useState([]);

    useEffect(() => {
        if (channelId) {

            database.channels.doc(channelId).onSnapshot((snapshot) => {
                setUsers(snapshot.data().users);
            });
        }

    }, [channelId, users]);

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
                        {users ? (
                            users.map((user) => (
                                // console.log(user)
                                <div className="user">
                                    <Avatar alt={user.username} src="/broken-image.jpg" />
                                    <span>{user.username}</span>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>{" "}
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ChannelDescription;
