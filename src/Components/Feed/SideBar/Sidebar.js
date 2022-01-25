import "./Sidebar.css";
import SidebarChannel from "./Sidebar-Channel/SidebarChannel";
import Loader from "../../Loader/Loader";

import React, { useContext } from "react";
import {NavLink} from "react-router-dom"

import { database } from "../../../Services/firebase";
import { AuthContext } from "../../../Services/AuthProvider";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { Avatar, Tooltip, makeStyles} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: "#18191b",
    },
    tooltip: {
        backgroundColor: "#18191b",
        fontSize: "12px",
        fontWeight: "600",
        padding: "10px",
        margin: "0",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.6)"
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

const Sidebar = (props) => {
    let { user } = props;

    let { genericLogout } = useContext(AuthContext);

    const logOutFn = async () => {
        await genericLogout();
    };
    const handleAddChannel = (e) => {
        e.preventDefault();

        const channelName = prompt("Enter a new channel name");

        if (channelName) {
            database.channels.add({
                channelName: channelName,
                users: [user.userId],
            });
        }

        //need optimisation
        database.channels.get().then((doc) => {
            const documents = doc.docs.map((doc) => ({
                id: doc.id,
                channel: doc.data(),
            }));

            documents.forEach((ele) => {
                if (channelName === ele.channel.channelName) {
                    let updatedChannels = [];
                    if (user.channels) {
                        updatedChannels = [...user.channels, ele.id];
                    } else {
                        updatedChannels = [ele.id];
                    }

                    database.users.doc(user.userId).update({
                        channels: updatedChannels,
                    });

                    // // setUser({ ...user, channels: updatedChannels });
                    // user = { ...user, channels: updatedChannels };
                    // let updateduser = [user]
                    // database.channels.doc(ele.id).update({
                    //     channelName : channelName,
                    //     users : updateduser
                    // })
                }
            });
        });
    };

    const handleDropdown = (e) => {
        let dropdown = document.querySelector(".sidebar__profileIcons>.dropdown");
        let dropdownStyles = window.getComputedStyle(dropdown);

        if (dropdownStyles.display === "none") {
            dropdown.style.display = "block";
        }
        else {
            dropdown.style.display = "none";
        }
    }

    return user ? (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>{user.username}</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>

                    <BootstrapTooltip title="Add Channel" placement="right" arrow>
                        <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                    </BootstrapTooltip>
                </div>
                <div className="sidebar__channelsList">
                    {user.channels ? (
                        user.channels.map((id) => <SidebarChannel key={id} id={id} />)
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar alt={user.username} src="/broken-image.jpg" />
                <div className="sidebar__profileInfo">
                    <h3>{user.username}</h3>
                    <p>#{user.userId.substring(0, 5)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon id="profile_settings" onClick={handleDropdown}/>
                    <div className="dropdown">
                        <NavLink to ={`/profile/${user.userId}`}  className="dropdown_content">
                            Profile
                            <PersonIcon/>
                        </NavLink>
                        <div className="dropdown_content" onClick={logOutFn}>
                            Log Out
                            <ExitToAppIcon/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default Sidebar;
