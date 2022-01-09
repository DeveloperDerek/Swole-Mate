import React from 'react';
import Hook from '../components/landing/Hook';
import Navbar from '../components/landing/Navbar';
import Guide from '../components/landing/Guide';
import Hero from '../components/landing/Hero';
import Footer from '../components/landing/Footer';
import Testimonial from '../components/landing/Testimonial';
import MainNavbar from '../components/main/MainNavbar';
import MatchSeeker from '../components/main/MatchSeeker';

const Homepage = () => {

    if(!localStorage.id)
    return(
        <div className="homepage">
            <Navbar />
            <Hero />
            <Hook />
            <Guide />
            <Testimonial />
            <Footer />
        </div>
    )

    return(
        <div className="bg">
            <MainNavbar />
            <MatchSeeker />
        </div>
    )
}

export default Homepage