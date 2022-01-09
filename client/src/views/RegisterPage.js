import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import RegisterForm from "../components/register/RegisterForm"

const RegisterPage = () => {
    return(
        <div className="regi-page">
            <Navbar />
            <RegisterForm />
            <Footer />
        </div>
    )
}

export default RegisterPage