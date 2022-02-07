import React from "react";
import {Navbar, Nav, NavDropdown, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// navbar
function Navigation() {
    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }
    
    return (
        <>
            <Navbar bg="warning" expand="lg" variant="light">
                <Container>
                    {/* redirect pagina principala */}
                    <Navbar.Brand href="#" onClick={(e) => navigateTo(e, "/")}>Librarie</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link href="" onClick={(e) => navigateTo(e, "/articlecreate")}>Create article</Nav.Link>
                            <Nav.Link href="" onClick={(e) => navigateTo(e, "/referencecreate")}>Create reference</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;