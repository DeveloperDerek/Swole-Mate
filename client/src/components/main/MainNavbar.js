import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const MainNavbar = () => {
    const [friends, setFriends] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios
        .get("http://localhost:9000/api/friend/getRequests", { withCredentials:true })
        .then((res) => setFriends(res.data))
        .catch(err => console.log(err))
    }, [])

    const logout = () => {
        axios
            .get('http://localhost:9000/api/user/logout')
            .then(() => {
                localStorage.clear();
                navigate('/');
                window.location.reload();
            })
    }

    const acceptFriend = (friend_id) => {
        const id = {id:friend_id}
        axios
            .post("http://localhost:9000/api/friend/acceptfriend", id, {withCredentials: true})
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
    }

    const rejectFriend = (friend_id) => {
        const id = {id:friend_id}
        axios
            .post("http://localhost:9000/api/friend/rejectfriend", id, {withCredentials: true})
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props}
        </Tooltip>
    );

    return(
            <nav className="navbar">
                {/* LOGO */}
                <a className="logo" href="/">SwoleMate</a>
                {/* NAVIGATION MENU */}
                <ul className="nav-links">
                    {/* USING CHECKBOX HACK */}
                    <input type="checkbox" id="checkbox_toggle" />
                    <label for="checkbox_toggle" className="hamburger">&#9776;</label>
                    {/* NAVIGATION MENUS */}
                    <div className="menu">
                        <li className="services">
                            <i className={friends.length > 0 ? "requests fas fa-user-friends" : "fas fa-user-friends"}></i>
                            {/* DROPDOWN MENU */}
                            <ul className="dropdown">
                                {friends.length == 0 ? <h6>No Friend Requests</h6> : <h6>Friend Requests</h6>}
                                    {friends.map((f, idx) => {
                                        return (
                                            <li key={idx} className="row">
                                                <a className="col" href={`/user/${f._id}`}>{f.firstName}</a>
                                                <button className="col btn btn-sm btn-success" onClick={() => acceptFriend(f._id)}>Accept</button>
                                                <button className="col btn btn-sm btn-danger" onClick={() => rejectFriend(f._id)}>Reject</button>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </li>
                        <OverlayTrigger placement="bottom-start" delay={{ show: 100, hide: 300 }} overlay={renderTooltip("User Profile")}>
                            <li><a href="/profile"><i className="far fa-user"></i></a></li>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom-start" delay={{ show: 100, hide: 300 }} overlay={renderTooltip("Messages")}>
                            <li><a href="/messages"><i className="far fa-envelope"></i></a></li>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom-start" delay={{ show: 100, hide: 300 }} overlay={renderTooltip("Logout")}>
                            <li><i className="fas fa-sign-out-alt" onClick={logout}></i></li>
                        </OverlayTrigger>
                    </div>
                </ul>
            </nav>
    )
}


export default MainNavbar