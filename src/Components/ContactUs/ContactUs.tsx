import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"

export default function ContactUs() {
    return (
        <div >
            <Navbar />
            <div className="page-container">

                <h1>Contact Us</h1>
                <p>If you have any questions about this project or would like to collaborate, feel free to reach out!</p>

                <ul>
                    <li>Email: <a href="mailto:khalidumar809@gmail.com">khalidumar809@gmail.com</a></li>
                    <li>GitHub: <a href="https://github.com/Ghabasjr" target="_blank">Ghabasjr</a></li>
                    <li>LinkedIn: <a href="https://www.linkedin.com/in/khalid-umar-muhammad" target="_blank">Khalid Umar Muhammad</a></li>
                </ul>
                <p>Thank you for visiting my portfolio!</p>
            </div>
            <Footer />
        </div>
    )
}