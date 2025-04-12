import React, { useContext, useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => setExpanded(false);

  return (
    <BootstrapNavbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          Graffiti Hub
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" onClick={handleNavClick}>Home</Nav.Link>
            <Nav.Link href="#gallery" onClick={handleNavClick}>Gallery</Nav.Link>
            <Nav.Link href="#events" onClick={handleNavClick}>Events</Nav.Link>
            <Nav.Link href="#artists" onClick={handleNavClick}>Artists</Nav.Link>
            <Nav.Link href="#about" onClick={handleNavClick}>About</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" onClick={handleNavClick}>{user.username}</Nav.Link>
                {user.is_staff && (
                  <Nav.Link as={Link} to="/admin-dashboard" onClick={handleNavClick}>Admin Dashboard</Nav.Link>
                )}
                <Nav.Link onClick={() => { logout(); handleNavClick(); }}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={handleNavClick}>Login</Nav.Link>
                {user?.is_staff ? null : (
                  <Nav.Link as={Link} to="/admin-login" onClick={handleNavClick}>Admin Login</Nav.Link>
                )}
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
