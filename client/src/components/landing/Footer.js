import React, { useState } from "react";
import axios from "axios";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    const addEmail = (e) => {
        e.preventDefault();
        const data = { email }
        axios
        .post("http://localhost:9000/api/mailchimp/addtonewsletter", data)
        .then(() => setSent(true))
        .catch((err) => setError(err.response.data.error))
    }
    
    return(
        <footer class="w-100 py-4 flex-shrink-0">
            <div class="container py-4">
                <div class="row gy-4 gx-5">
                    <div class="col-lg-4 col-md-6">
                        <h5 class="h1">Swole Mate</h5>
                        <p class="small">Find your perfect fitness partner <br/>Service in Southern California area</p>
                        <p class="small mb-0">&copy; Copyrights. All rights reserved. <a href="#">SwoleMate.com</a></p>
                    </div>
                    <div class="col-lg-2 col-md-6">
                        <h5 class="mb-3">Quick links</h5>
                        <ul class="list-unstyled">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/register">Get started</a></li>
                            <li><a href="/faq">FAQ</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-6">
                        <h5 class="mb-3">Follow Us</h5>
                        <ul class="list-unstyled text-muted">
                            <li><a href="https://www.facebook.com/groups/1757714674428225" target="_blank"><i className="fab fa-facebook"></i> Facebook</a></li>
                            <li><a href="https://twitter.com/FindSwoleMate" target="_blank"><i className="fab fa-twitter"></i> Twitter</a></li>
                            <li><a href="https://www.instagram.com/findswolemate/" target="_blank"><i className="fab fa-instagram"></i> Instagram</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <h5 class="mb-3">Newsletter</h5>
                        {sent ?
                        <p>Thank you for signing up</p>
                        :
                        <>
                        <p class="small">Sign up for our newsletter to recieve emails about new features and updates</p>
                        <form onSubmit={addEmail}>
                            <div class="input-group mb-3">
                                <input type="email" class="form-control" required="" placeholder="Enter your email address..." value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button class="btn" id="button-addon2" type="button"><i class="fas fa-paper-plane"></i></button>
                            </div>
                            {error ? <p className="error">{error}</p> : ""}
                        </form>
                        </>
                        }
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer