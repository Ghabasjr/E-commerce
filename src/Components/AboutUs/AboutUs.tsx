import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "../../styles/infoPages.css";


export default function AboutUs() {
    return (
        <div className="about-us">
            <Navbar />
            <div className="page-container">
                <h1>About Us</h1>
                <p>Welcome to my e-commerce portfolio project!</p>
                <p>My name is Khalid, and I’m a passionate frontend developer focused on creating responsive, user-friendly web applications. This website is a demonstration of my skills using modern web technologies such as React, Vite, and mock APIs.</p>
                <p>This store does not sell real products. All items, images, and transactions are simulated to showcase design, layout, and functionality. It is intended for portfolio and learning purposes only.</p>

            </div>
            <Footer />
        </div>
    );
}