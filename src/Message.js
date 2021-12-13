import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

const Message = ({ timestamp, user, message }) => {
    console.log(user)

    return (
        <div className="message">
            <Avatar alt={user} src="/broken-image.jpg" />
            <div className="message__info">
                <h4>
                    {user}
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>

                <p>{message}</p>
            </div>
        </div>
    );
};

export default Message;
