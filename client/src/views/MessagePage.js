import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';
import MainNavbar from "../components/main/MainNavbar";
import FriendsList from "../components/messenger/FriendsList";
import Chat from "../components/messenger/Chat";

const MessagePage = () => {
    const [active, setActive] = useState("");
    const socket = io(":9000");
    
    socket.on("connect", () => {
        axios
            .post("http://localhost:9000/api/user/setstatus", {status: true}, { withCredentials:true })
    });

    return(
        <div className="message-page">
            <MainNavbar />
            <div class="container-fluid">
                <div class="clearfix rowrow">
                    <div class="rowx">
                        <div class="card chat-app">
                            <FriendsList active={active} setActive={setActive} />
                            <Chat active={active} setActive={setActive} socket={socket} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <MsgSystem socket={socket} /> */}
        </div>
    )
}

export default MessagePage