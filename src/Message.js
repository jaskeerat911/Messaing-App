import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

const Message = ({ timestamp, user, message }) => {
    // const Message = ({ message }) => {

    // console.log(message)

    return (
        <div className="message">
            <Avatar alt={user.username} src="/broken-image.jpg" />
            <div className="message__info">
                <h4>
                    {user.username}
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
