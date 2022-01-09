import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import moment from 'moment';

const Profile = () => {
    const [fileUpload, setFileUpload] = useState(null);
    const [user, setUser] = useState(null)
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState({
        feet: "",
        inches: ""
    })
    const [bio, setBio] = useState("")
    const [err, setErr] = useState(null)

    useEffect(() => {
        axios
        .get("http://localhost:9000/api/user/getLoggedInUser", { withCredentials: true })
        .then((res) => {
            console.log(res.data)
            setUser(res.data)
            setWeight(res.data.weight)
            setHeight(res.data.height)
            setBio(res.data.bio)
        })
        .catch((err => console.log(err)))
    }, [])

    const uploadPhoto = async (e) => {
        e.preventDefault();
        if (fileUpload) {
            const imageData = new FormData();
            imageData.append("image", fileUpload);
            
            await axios
            .put("http://localhost:9000/api/user/addpic", imageData, { withCredentials: true })
            .then((res) => {
                if (res.data == false) {
                    setErr("error")
                } else {
                    console.log(res.data);
                    setUser(res.data);
                    setFileUpload(null);
                }
            })
        }
    }

    const deletePhoto = async (url) => {
        const data = { url }
        await axios
        .put("http://localhost:9000/api/user/deletepic", data, { withCredentials: true })
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err))
    }

    const updateProfile = (e) => {
        e.preventDefault();
        const changes = { weight, height, bio }
        axios
        .post("http://localhost:9000/api/user/update", changes, { withCredentials: true })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    if (!user) {
        return(
        <section className="profile">
            <Card className="loading-spinner">
                <div className="spinner-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading Spinner</span>
                    </Spinner>
                </div>
            </Card>
        </section>
        )
    }

    return(
        <section className="profile container-fluid">
            <Card className="profile-info">
                <Tabs defaultActiveKey="photos" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="photos" title="Photos" className="tabbie">
                        <Card.Body>
                            <div className="row mb-5">
                                <Carousel variant="dark" fade className="col-md" controls={user.pictures.length > 1 ? true : false}>
                                    {user.pictures.map((pic, idx) => {
                                        return(
                                            <Carousel.Item key={idx}>
                                                <div className="center-container">
                                                    <img
                                                    src={pic}
                                                    alt="slide"
                                                    />
                                                </div>
                                                {user.pictures.length > 1 ?
                                                    <div className="w-100 center-container mb-5">
                                                        <Button onClick={() => deletePhoto(pic)} className="delete-img"><i className="fas fa-trash"></i></Button>
                                                    </div>
                                                :""
                                                }
                                            </Carousel.Item>
                                        )
                                    })}
                                </Carousel>
                                <div className="col-md">
                                    <h2 className="mb-3">Upload Photo</h2>
                                    <Form onSubmit={uploadPhoto}>
                                        <Form.Group controlId="formFileMultiple" className="mb-2">
                                            <Form.Label>Select a photo to add to your profile</Form.Label>
                                            <Form.Control type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
                                        </Form.Group>
                                        <h6 className={err ? "text-danger mb-2" : "mb-2"}>Photo must be formatted in jpg or png</h6>
                                        <Button type="submit" variant="success">Upload</Button>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Tab>
                    <Tab eventKey="profile" title="Profile" className="tabbie">
                        <Card.Body>
                        <h2>User Details</h2>
                        <Form onSubmit={updateProfile}>
                            <div className="container-fluid mb-3">
                                <Form.Group className="row">
                                    <Form.Label>Height</Form.Label>
                                    <Form.Control type="number" min="0" className="col" placeholder="ft." onChange={(e) => setHeight({...height, feet:e.target.value})} value={height.feet} />
                                    <Form.Control type="number" min="0" max="11" className="col" placeholder="in." onChange={(e) => setHeight({...height, inches:e.target.value})} value={height.inches} />
                                </Form.Group>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="number" placeholder="lbs." value={weight} onChange={(e) => setWeight(e.target.value)}></Form.Control>
                            </Form.Group>
                            <div className="mb-3">
                                <label class="form-label">Bio</label>
                                <textarea value={bio} onChange={(e) => setBio(e.target.value)} class="form-control" rows="3"></textarea>
                            </div>
                            <Button type="submit" variant="success" className="save">Save</Button>
                        </Form>
                        </Card.Body>
                    </Tab>
                    <Tab eventKey="info" title="Info" className="tabbie">
                        <Card.Body>
                            <h2>User Information</h2>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control disabled type="text" placeholder={user.email}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control disabled type="text" placeholder={user.firstName}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control disabled placeholder={moment(user.birthday).format("MM-DD-YYYY")}></Form.Control>
                            </Form.Group>
                        </Card.Body>
                    </Tab>
                </Tabs>
            </Card>
        </section>
    )
}

export default Profile