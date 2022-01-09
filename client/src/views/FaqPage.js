import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import Faq from '../components/quicklinks/Faq';

const FaqPage = () => {

    return(
        <div className="link-page">
            <Navbar />
            <Faq />
            <Footer />
        </div>
    )

}

export default FaqPage