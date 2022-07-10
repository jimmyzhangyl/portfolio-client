import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function Navigation() {
    const root = process.env.REACT_APP_ROOT;
    return (
        < Navbar bg="light" variant="light" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand href={`${root}/about`}><img className="img-fluid"
                    style={{ width: "6rem" }}
                    alt="logo" src={require("../../img/YLZ_logo.png")} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="ms-auto nav-font">
                        <Nav.Link href={`${root}/about`}><strong>ABOUT</strong></Nav.Link>
                        <Nav.Link href={`${root}/skills`}><strong>SKILLS</strong></Nav.Link>
                        <Nav.Link href={`${root}/projects/index`}><strong>PROJECTS</strong></Nav.Link>
                        <Nav.Link href={`${root}/contact`}><strong>CONTACTS</strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}