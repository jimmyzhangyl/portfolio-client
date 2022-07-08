import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function Navigation() {
    // change the "bg" to custom the color schemes
    return (
        < Navbar bg="light" variant="light" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand href='/about'><img className="img-fluid"
                    style={{ width: "6rem" }}
                    alt="logo" src={require("../../img/YLZ_logo.png")} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="ms-auto nav-font">
                        <Nav.Link href="/about"><strong>ABOUT</strong></Nav.Link>
                        <Nav.Link href="/skills"><strong>SKILLS</strong></Nav.Link>
                        <Nav.Link href="/projects/index"><strong>PROJECTS</strong></Nav.Link>
                        <Nav.Link href="/contact"><strong>CONTACTS</strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}