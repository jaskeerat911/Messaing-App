import "./Message.css";

import React, {useEffect, useState} from "react";

import { database } from "../../../../../../Services/firebase";

import { Avatar } from "@material-ui/core";

const Message = ({ timestamp, userId, message }) => {
    let [userData, SetUserData] = useState(null);

    useEffect(() => {
        database.users.doc(userId).onSnapshot((doc) => {
            SetUserData(doc.data());
        });
    })

    return (
        userData ?
            <div className="message">
                <Avatar alt={userData.username} src="/broken-image.jpg" />
                <div className="message__info">
                    <h4>
                        {userData.username}
                        <span className="message__timestamp">
                            {new Date(timestamp?.toDate()).toUTCString()}
                        </span>
                    </h4>

                    <p>{message}</p>
                </div>
            </div> : <></>
    );
};

export default Message;
