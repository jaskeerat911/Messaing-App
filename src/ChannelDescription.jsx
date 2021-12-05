import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, Tooltip, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { database } from "./firebase";
import { selectChannelId, selectChannelName } from "./features/appSlice";

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: '#0a0a0a'
    },
    tooltip: {
        backgroundColor: '#0a0a0a',
        fontSize: '12px',
        fontWeight: '600',
        padding: '10px',
        margin: '0'
    }
}))

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

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
                    return;
                }
            });

            if (!flag) {
                alert("User does not exist");
            }
        });
    };

    return (
        <div className="channel__description">
            {channelId ? (
                <>
                    <div className="channel__title">
                        <h3>#</h3>
                        <h2>{channelName}</h2>
                        <BootstrapTooltip title='Add User' placement="top" arrow >
                            <AddIcon className="channel__addUser" onClick={handleAddUser} />
                        </BootstrapTooltip>
                    </div>
                    <div className="channel__users">
                        {/* {users ? (
                            users.map((user) => (
                                <div className="user">
                                    <Avatar alt={user.username} src="/broken-image.jpg" />
                                    <span>{user.username}</span>
                                </div>
                            ))
                        ) : (
                            <></>
                        )} */}
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ChannelDescription;
