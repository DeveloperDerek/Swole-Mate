import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const OffCanvas = (props) => {
    const [settings, setSettings] = useState({
        min: "",
        max: "",
        gender: ""
    })

    useEffect(() => {
        axios
        .get("http://localhost:9000/api/user/getLoggedinuser", { withCredentials:true })
        .then((res) => {
            setSettings({
                min: res.data.settings.min,
                max: res.data.settings.max,
                gender: res.data.settings.gender
            })
        })
        .catch((err) => console.log(err))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(settings => ({ ...settings, [name]: value}))
    }

    const formHandler = (e) => {
        e.preventDefault();
        let update = { settings }
        axios
        .post("http://localhost:9000/api/user/update", update, { withCredentials:true })
        .then(window.location.reload())
        .catch((err) => console.log(err))
    }

    if (!settings) {
        return(
            <div>loading</div>
        )
    }

    return(
    <div>
        <Offcanvas show={props.show} onHide={props.onHide}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Match Seeker Settings</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form onSubmit={formHandler}>
                    <Form.Group className="mb-4">
                        <Form.Label><i class="fas fa-angle-down"></i>Age</Form.Label>
                        <Form.Control type="number" value={settings.min} onChange={handleChange} name="min" />
                        <Form.Text>Set minimum age for match seeking</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label><i class="fas fa-angle-up"></i>Age</Form.Label>
                        <Form.Control type="number" value={settings.max} onChange={handleChange} name="max" />
                        <Form.Text>Set maximum age for match seeking</Form.Text>
                    </Form.Group>
                    <Form.Label>Gender</Form.Label>

                    <Form.Group className="mb-4">
                        <Form.Select value={settings.gender} name="gender" onChange={handleChange}>
                            <option value="">Either</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                        <Form.Text>Select gender for match seeking</Form.Text>
                    </Form.Group>
                    <Button type="submit" variant="success">Save</Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    </div>
    )
}

export default OffCanvas