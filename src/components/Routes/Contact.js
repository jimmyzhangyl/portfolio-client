import Container from "react-bootstrap/esm/Container";
import { Mailer } from "../components";

export default function Contact() {
    return (
        < >
            <div className="contact-top">
                <div style={{color:"#bfb7b6"}}>
                    <h2 className="d-flex justify-content-center me-5 pe-5">Thank you for visiting my portfolio!</h2>
                    <h2 className="d-flex justify-content-center ms-5 ps-5">Hope you like it!</h2>
                </div>
                <Container className="d-flex justify-content-center">
                    <Mailer />
                </Container>
            </div>
            <div className="contact-bot"></div>
        </>
    )
}