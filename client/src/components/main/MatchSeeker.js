import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import moment from 'moment';
import Offcanvas from './Offcanvas';

const MatchSeeker = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [frId, setFrId] = useState([]);
    const [show, setShow] = useState(false);
    const [start, setStart] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios
        .get("http://localhost:9000/api/friend/getNonFriends", { withCredentials:true })
        .then(res => {
            // add user ID that are already friends to set
            for (let i = 0; i < res.data.length; i++) {
                // if id does not equal to logged in user id
                if (res.data[i]._id != localStorage.id)
                setFrId(arr => [...arr, res.data[i]._id])
            }
            // add logged in user id to set
        })
    }, [])

    const getMatches = async () =>  {
        setStart(true);
        await axios
        .get("http://localhost:9000/api/user/swole-search", { withCredentials:true })
        .then((res) => {
            // randomize array
            shuffleArray(res.data)
            // filter out users that are not friends
            setUsers(res.data.filter(u => frId.includes(u._id)))
            // set first user to be displayed
            setUser(res.data.filter(u => frId.includes(u._id))[0])
        })
        .catch((err) => console.log(err))
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const thumbsDown = () => {
        // remove user from array
        users.splice(0, 1);
        // set next user to be displayed
        setUser(users[0]);
    }

    const thumbsUp = (recipient_id) => {
        const recipient = { id: recipient_id} 
        axios
        .post("http://localhost:9000/api/friend/requestFriend", recipient, { withCredentials: true })
        .then((res) => {
            // remove user from array
            users.splice(0, 1);
            // set next user to be displayed
            setUser(users[0]);
        })
        .catch((err) => console.log(err))
    }

    return(
        <section className="match">
            <Card className="match-card">
                <Card.Body>
                    {!start ?
                    <div className="match-btn-container">
                    <button onClick={() => getMatches()} className="match-btn">Find Matches</button>
                    </div>
                    :
                    <>
                    {!user ?
                    <>
                    <h5>No Current Matches</h5>
                    <div className="spinner-container">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading Spinner</span>
                        </Spinner>
                    </div>
                    </>
                    :
                    <div className="current_match">
                        <Carousel variant="dark" controls={user.pictures.length > 1 ? true : false}>
                        {user.pictures.map((pic, idx) => {
                            return(
                                <Carousel.Item key={idx}>
                                    <div className="img-container">
                                        <img
                                            className="match-img"
                                            src={pic}
                                            alt="slide"
                                        />
                                    </div>
                                </Carousel.Item>
                            )
                        })}
                        </Carousel>
                        <div className={user.gender === "Female" ? "girl" : "boy"}>
                            <h1>{user.firstName}, {moment().diff(user.birthday, 'years')}</h1>
                            {user.height.feet ? <span>{user.height.feet}'</span> : ""} {user.height.inches ? <span>{user.height.inches}''</span> : ""}
                            {user.weight ?
                                <h6>{user.weight} lbs</h6>
                            :""}
                            <p>{user.bio}</p>
                        </div>
                        <div className="match-buttons">
                            <button className="thumbs-down" onClick={() => thumbsDown()}>
                                <i className="far fa-thumbs-down"></i>
                            </button>
                            <button className="thumbs-up" onClick={() => thumbsUp(user._id)}>
                                <i className="far fa-thumbs-up"></i>
                            </button>
                        </div>
                    </div>
                    }
                    </>
                    }
                </Card.Body>
            <button className="setting-btn" onClick={handleShow}>preference</button>
            </Card>
            <Offcanvas show={show} onHide={handleClose} />
        </section>
    )
}

export default MatchSeeker