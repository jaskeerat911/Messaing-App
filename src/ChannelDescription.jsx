import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, Tooltip, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { database } from "./firebase";
import { selectChannelId, selectChannelName } from "./features/appSlice";

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: "#0a0a0a",
    },
    tooltip: {
        backgroundColor: "#0a0a0a",
        fontSize: "12px",
        fontWeight: "600",
        padding: "10px",
        margin: "0",
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

function ChannelDescription() {
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    let [usersInSelectedChannel, setUsersInSelectedChannel] = useState([]); // users in selected channel
    let [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (channelId) {
            database.channels.doc(channelId).onSnapshot((snapshot) => {
                let allUsersId = snapshot.data().users;
                // setUsers(allUsersId);
                
                let allUsers = [];
                allUsersId.map((userId) => {
                    let data = database.users.doc(userId).get();
                    allUsers.push(data);
                })
                
                Promise.all(allUsers).then(function (user) {
                    let allUsersData = [];
                    user.forEach(doc => {
                        allUsersData.push(doc.data())
                    });
                    setUsersInSelectedChannel(allUsersData);
                });

                // for (let i = 0; i < allUsersId.length; i++){
                //     database.users.doc(allUsersId[i]).onSnapshot((doc) => {
                //         allUsersData.push(doc.data());
                //         allUsersData.push(doc.data());
                        
                //         if (i === allUsersId.length - 1) {
                //             console.log(allUsersData)
                //         }
                //     })
                // }
            });
        }

        database.users.get().then((doc) => {
            let allUsersData = doc.docs.map((userData) => userData.data())

            setAllUsers(allUsersData);
        })

    }, [channelId]);

    const handleAddUser = (e) => {
        e.preventDefault();

        const userName = prompt("Enter a new user name");
        
        let flag = false;
        allUsers.forEach((user) => {
            if (userName === user.username) {
                flag = true;

                let allUsersId = usersInSelectedChannel.map(user => user.userId);
                let updatedChannelUsers = [...allUsersId, user.userId];

                // add new user to the selected channel database
                database.channels.doc(channelId).update({ 
                    users : updatedChannelUsers
                })

                let updatedChannels = [];
                if (user.channels) {
                    updatedChannels = [...user.channels, channelId]
                }
                else {
                    updatedChannels = [channelId]
                }

                // add the selected channel to the user database
                database.users.doc(user.userId).update({
                    channels : updatedChannels
                })
            }
        })

        if (!flag) {
            alert("User does not exist")
        }

        // database.users.get().then((doc) => {
        //     const documents = doc.docs.map((doc) => doc.data());
        //     let flag = false;
        //     documents.forEach((ele) => {
        //         if (userName === ele.username) {
        //             let updatedUsers = [...users, ele];
        //             database.channels.doc(channelId).update({
        //                 users: updatedUsers,
        //             });

        //             flag = true;
        //             return;
        //         }
        //     });

        //     if (!flag) {
        //         alert("User does not exist");
        //     }
        // });
    };

    return (
        <div className="channel__description">
            {channelId ? (
                <>
                    <div className="channel__title">
                        <h3>#</h3>
                        <h2>{channelName}</h2>
                        <BootstrapTooltip title="Add User" placement="top" arrow>
                            <AddIcon className="channel__addUser" onClick={handleAddUser} />
                        </BootstrapTooltip>
                    </div>
                    <div className="channel__users">
                        {usersInSelectedChannel ? (
                            usersInSelectedChannel.map((user) =>
                                <div className="user">
                                    <Avatar alt={user.username} src="/broken-image.jpg" />
                                    <span>{user.username}</span>
                                </div>
                            )
                        ) : (
                            <></>
                        )}
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ChannelDescription;
