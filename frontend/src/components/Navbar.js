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
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" onClick={handleNavClick}>{user.username}</Nav.Link>
                {user.is_staff && (
                  <Nav.Link as={Link} to="/admin-dashboard" onClick={handleNavClick}>Admin Dashboard</Nav.Link>
                )}
                <Nav.Link onClick={() => { logout(); handleNavClick(); }}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/auth" onClick={handleNavClick}>Login / Register</Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
