import Carousel from 'react-bootstrap/Carousel';
import slideOne from "../../images/caro1.jpg";
import slideTwo from "../../images/caro2.jpg";
import slideThree from "../../images/caro3.jpg";

const Guide = () => {
    return(
        <section className="guide">
            <h2>How to Get Started</h2>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block m-auto rounded"
                    src={slideOne}
                    alt="First slide" />
                    <Carousel.Caption>
                        <h3>Register Account</h3>
                        <p>create and your account and update your bio</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                    className="d-block m-auto rounded"
                    src={slideTwo}
                    alt="Second slide" />
                    <Carousel.Caption>
                        <h3>Find Matches</h3>
                        <p>set your preference and begin swipping</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <img
                    className="d-block m-auto rounded"
                    src={slideThree}
                    alt="Third slide" />
                    <Carousel.Caption>
                        <h3>Start Messaging</h3>
                        <p>approve your matches and begin to conversate</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </section>
    )
}

export default Guide