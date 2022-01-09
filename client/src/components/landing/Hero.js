import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return(
        <section className="hero" id="home">
            <div className="hero-container">
                <div className="cta">
                    <h1>find your fitness partner with swoleMate</h1>
                    <p className="fancy-link">SwoleMate is a free application that can help you find your the ideal fitness partner</p>
                    <button onClick={() => navigate('/register')}>Begin Here</button>
                </div>
            </div>
        </section>
    )
}

export default Hero