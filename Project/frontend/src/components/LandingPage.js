import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Optional custom CSS

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Graffiti Art</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section text-center py-5">
                <div className="container">
                    <h1 className="display-4">Welcome to Graffiti Art</h1>
                    <p className="lead">Explore the world of urban art and creativity.</p>
                    <div className="mt-4">
                        <Link to="/login" className="btn btn-primary btn-lg me-3">Login</Link>
                        <Link to="/register" className="btn btn-outline-light btn-lg">Register</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Why Choose Us?</h2>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-paint-brush fa-3x"></i>
                            </div>
                            <h3>Unique Artworks</h3>
                            <p>Discover one-of-a-kind graffiti pieces from talented artists around the world.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-shipping-fast fa-3x"></i>
                            </div>
                            <h3>Fast Delivery</h3>
                            <p>Get your favorite artworks delivered to your doorstep quickly and securely.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-headset fa-3x"></i>
                            </div>
                            <h3>24/7 Support</h3>
                            <p>Our team is always here to help you with any questions or issues.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer bg-dark text-white text-center py-4">
                <div className="container">
                    <p>&copy; 2023 Graffiti Art. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;