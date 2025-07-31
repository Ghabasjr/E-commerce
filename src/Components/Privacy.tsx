import "../styles/infoPages.css"
import Footer from "./Footer/Footer"
import Navbar from "./Navbar/Navbar"

export default function Privacy() {
    return (
        <div>
            <Navbar />
            <div className="page-container">
                <h1>Privacy Policy</h1>
                <p>This is a demo e-commerce site created for educational and portfolio purposes. We do not collect personal data, process payments, or track users in any way.</p>
                <p>Any forms or data entered are not stored or used. No cookies or third-party trackers are implemented beyond standard browser functions.</p>
                <p>By using this site, you acknowledge that all content is simulated and non-commercial.</p>
            </div>
            <Footer />
        </div>
    )
}