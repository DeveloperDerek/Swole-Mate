import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';

const Chat = (props) => {
    const { active, socket } = props;
    const [msg, setMsg] = useState([]);
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }
    

    useEffect(() => {
        if(active) {
            const data = { from: localStorage.id, to: active._id}
            socket.emit("get-msgs", data);
        }
    }, [active])

    const sendMessage = (e) => {
        e.preventDefault();
        const data = { from: localStorage.id, to:active._id, body:message }
        socket.emit("new msg", data);
        setMessage("");
        scrollToBottom();
    }

    socket.on("send dm", (msgs) => {
        setMsg(msgs)
    })

    return(
        <div className="chat">
            <div className="chat-header clearfix">
                <div className="row">
                {active ? 
                        <>
                        <div className="col-lg-6">
                            <a href={`/user/${active._id}`} data-toggle="modal" data-target="#view_info">
                                <img src={active.pictures[0]} alt="avatar" />
                            </a>
                            <div className="chat-about">
                                <h6 className="m-b-0">{active.firstName}</h6>
                                {active.status === true ?
                                <div className="status"><i className="fa fa-circle online"> Online</i></div>
                                :
                                <h6 className="status"><i className="fa fa-circle offline"> Offline</i></h6>
                                
                                }
                            </div>
                        </div>
                        <div className="col-lg-6 d-block d-sm-none">
                            <div className="float-lg-end">
                                <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                            </div>
                        </div>
                        </>
                        :
                        <div className="spinner-container">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading Spinner</span>
                            </Spinner>
                        </div>
                    }
                </div>
            </div>
            <div className="chat-history" ref={messagesEndRef}>
                <ul className="m-b-0" id="chat">
                    {msg.map((m, idx) => {
                        if(m.from._id == localStorage.id) {
                        return(
                        <li className="clearfix" key={idx}>
                            <div className="message-data text-end">
                                <h6 className="message-data-time">{moment(m.createdAt).format("MM-DD-YYYY, h:mm a")}</h6>
                            </div>
                            <div className="message other-message float-right">{m.body}</div>
                        </li>
                        )
                        } else {
                        return(
                        <li className="clearfix">
                            <div className="message-data text-start">
                                <h6 className="message-data-time">{moment(m.createdAt).format("MM-DD-YYYY, h:mm a")}</h6>
                            </div>
                            <div className="message my-message float-left">{m.body}</div>
                        </li>
                        )
                        }
                    })}
                </ul>
                <div style={{height:"1px"}}></div>
            </div>
            <form className="chat-message" onSubmit={sendMessage}>
                <div className="input-group mb-3">
                    <button className="btn"><i className="fa fa-send"></i></button>
                    <input type="text" className="form-control" placeholder="Enter text here..." value={message} onChange={(e) => setMessage(e.target.value)}/>   
                </div>
            </form>
        </div>
    )
}

export default Chat