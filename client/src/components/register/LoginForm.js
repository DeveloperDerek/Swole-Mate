import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        const logUser = { email, password }
        axios
            .post("http://localhost:9000/api/user/login", logUser, { withCredentials: true })
            .then((res) => {
                localStorage.clear();
                localStorage.setItem('id', res.data.id)
                navigate('/')  
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data)
            })
    }

    return(
        <section className="login">
            <h1>Login</h1>
            <form className="formcontrol" onSubmit={login}>
                <div className="input-label-group">
                    {errors.email ?
                        <label className="error">{errors.email?.message}</label> 
                    :
                        <label className="form-label">Email</label>
                    }
                    <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className="input-label-group">
                    {errors.password ?
                        <label className="error">{errors.password?.message}</label> 
                    :
                        <label className="form-label">Password</label>
                    }
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                {errors ? 
                <p className="error">{errors.msg}</p>
                :
                ""}
                <button className="loginButton">Login</button>
                <a href="/register">New Customer? Signup <i class="fas fa-long-arrow-alt-right"></i></a>
            </form>
        </section>
    )
}

export default LoginForm