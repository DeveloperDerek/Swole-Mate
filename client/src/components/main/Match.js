import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import moment from 'moment';

const Match = (props) => {
    const { id } = props
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
        .get(`http://localhost:9000/api/user/getuser/${id}`)
        .then((usr) => setUser(usr.data))
        .catch((err) => console.log(err))
    }, [])

    return(
        <section className="match">
            <Card className="match-card">
                <Card.Body>
                    {!user ?
                    <>
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
                        <h1>{user.firstName}, {moment().diff(user.birthday, 'years')}</h1>
                        {user.height.feet ? <span>{user.height.feet}'</span> : ""} {user.height.inches ? <span>{user.height.inches}''</span> : ""}
                        {user.weight ?
                            <h6>{user.weight} lbs</h6>
                        :""}
                        <p>{user.bio}</p>
                    </div>
                    }
                </Card.Body>
            </Card>
        </section>
    )
}

export default Match