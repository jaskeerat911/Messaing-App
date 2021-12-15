import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "./features/appSlice";
import "./SidebarChannel.css";

const SidebarChannel = ({ id }) => {
    const dispatch = useDispatch();
    let [channelData, setChannelData] = useState(null);

    useEffect(() => {
        database.channels.doc(id).onSnapshot((doc) => {
            setChannelData(doc.data());
        });
    }, [id]);

    const handlSidebarChannel = (e) => {
        dispatch(
            setChannelInfo({
                channelId: id,
                channelName: channelData.channelName,
            })
        );
        
        let selectedChannel = document.querySelector(".sidebarChannel.selected");
        console.log(selectedChannel)
        if (selectedChannel) {
            selectedChannel.classList.remove("selected");
        }
            e.currentTarget.classList.add("selected");
    };

    return channelData ? (
        <div className="sidebarChannel_container">
            <div className="sidebarChannel" onClick={handlSidebarChannel}>
                <div>
                    <h1>#</h1>
                    {channelData.channelName}
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default SidebarChannel;
