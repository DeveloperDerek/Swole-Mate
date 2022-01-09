import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";
import LoginForm from "../components/register/LoginForm";

const LoginPage = () =>  {
    return(
        <div className="login-page">
            <Navbar />
            <LoginForm />
            <Footer />
        </div>
    )
}

export default LoginPage