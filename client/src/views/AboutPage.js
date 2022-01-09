import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import About from '../components/quicklinks/About';

const AboutPage = () => {

    return(
        <div className="link-page">
            <Navbar />
            <About />
            <Footer />
        </div>
    )

}

export default AboutPage