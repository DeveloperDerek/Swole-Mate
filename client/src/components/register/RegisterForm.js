import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [user, setUser] = useState({
        birthday: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value}))
    }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:9000/api/user/register", user, { withCredentials:true })
            .then((res) => {
                localStorage.clear();
                localStorage.setItem('id', res.data);
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response);
                setErrors(err.response.data.errors);
            })
    }

    return(
    <section className="regi">
        <div className="regi-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    {errors.birthday ? 
                        <label className="err">{errors.birthday.message}</label>
                        :
                        <label>Birthday</label>
                    }
                    <input className="input" type="date" name="birthday" value={user.birthday} onChange={handleChange} />
                </div>

                <div className="input-field">
                    {errors.email ?
                        <label className="err">{errors.email.message}</label>
                        :
                        <label>Email</label>
                    }
                    <input className="input" type="email" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div className="input-field">
                    {errors.firstName ?
                        <label className="err">{errors.firstName.message}</label>
                        :
                        <label>First Name</label>
                    }
                    <input className="input" type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                </div>
                <div className="input-field">
                    {errors.lastName ?
                        <label className="err">{errors.lastName.message}</label>
                        :
                        <label>Last Name</label>
                    }
                    <input className="input" type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                </div>
                <div className="input-field">
                    {errors.gender ?
                        <label className="err">{errors.gender.message}</label>
                        :
                        <label>Gender</label>
                    }
                    <div className="custom-select">
                        <select name="gender" onChange={handleChange}>
                            <option>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="input-field">
                    {errors.password ?
                        <label className="err">{errors.password.message}</label>
                        :
                        <label>Password</label>
                    }
                    <input className="input" type="password" name="password" value={user.password} onChange={handleChange} />
                </div>
                <div className="input-field">
                    {errors.confirmPassword ?
                        <label className="err">{errors.confirmPassword.message}</label>
                        :
                        <label>Confirm Password</label>
                    }
                    <input className="input" type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} />
                </div>
                <button>Register</button>
                <a href="/login">Already have an account? Login <i class="fas fa-long-arrow-alt-right"></i></a>
            </form>
        </div>
    </section>
    )
}

export default RegisterForm