import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const FriendsList = (props) => {
    const [friends, setFriends] = useState(null);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState("");
    const { setActive } = props;

    var retrievedObject = JSON.parse(localStorage.getItem('select'));

    useEffect(() => {
        axios
        .get("http://localhost:9000/api/friend/getFriends", { withCredentials:true })
        .then(res => {
            console.log(res.data)
            setFriends(res.data);
            setList(res.data);
            if (retrievedObject) {
                setActive(JSON.parse(localStorage.getItem('select')));
                setUser(JSON.parse(localStorage.getItem('select'))._id);
            } else {
                setActive(res.data[0]);
                setUser(res.data[0]._id);
            }
        })
        .catch(err => console.log(err))
    }, [])

    const searchList = (e) => {
        setSearch(e.target.value.toLowerCase());
        // set search input to lowercase
        setFriends(list.filter(f => f.firstName.toLowerCase().includes(search)))
        // filter friends with default list
        // set firstName to lowercase to match search input
        // filter to includes search input
        if (e.target.value === "") {
            setFriends(list)
        }
        // if search input is empty reset the friends list
    }

    const activeUserChat = (user) => {
        localStorage.setItem('select', JSON.stringify(user));
        setActive(user);
        setUser(user._id);
    }

    if (friends === null) {
        return(
            <div className="people-list" id="plist">
                <div className="spinner-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading Spinner</span>
                    </Spinner>
                </div>
            </div>
        )
    }

    return(
        <div id="plist" class="people-list">
            <div class="input-group">
                <span class="input-group-text"><i class="fa fa-search"></i></span>
                <input type="text" class="form-control" placeholder="Search..." value={search} onChange={searchList}/>
            </div>
            <ul class="list-unstyled chat-list mt-2 mb-0">
            {friends.map((f, idx) => {
            return (
                <li class={f._id === user ? "active clearfix" : "clearfix"} key={idx} onClick={() => activeUserChat(f)}>
                    <img src={f.pictures[0]} alt="avatar" />
                    <div class="about">
                        <div class="name">{f.firstName}</div>
                        {f.status === true ?
                        <div className="status"><i className="fa fa-circle online"> Online</i></div>
                        :
                        <div className="status"><i className="fa fa-circle offline"> Offline</i></div>
                        }
                    </div>
                </li>
            )
            })}
            </ul>
        </div>
    )
}

export default FriendsList