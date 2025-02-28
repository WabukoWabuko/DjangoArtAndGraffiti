import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Updated CSS

const LandingPage = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    // Animate hero section on load
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Handle smooth scroll to features
    const scrollToFeatures = () => {
        document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' });
    };

    // Handle CTA navigation with animation
    const handleExploreClick = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand text-glow" to="/">Graffiti Art</Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link hover-effect" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link hover-effect" to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Animation */}
            <section className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
                <div className="container h-100 d-flex flex-column justify-content-center align-items-center text-center">
                    <h1 className="display-3 fw-bold text-shadow">Welcome to Graffiti Art</h1>
                    <p className="lead fs-4 text-white text-shadow">Explore the vibrant world of urban art and creativity.</p>
                    <div className="mt-4">
                        <button 
                            onClick={handleExploreClick} 
                            className="btn btn-primary-gradient btn-lg me-3 hover-scale"
                        >
                            Explore Now
                        </button>
                        <Link 
                            to="/register" 
                            className="btn btn-outline-light btn-lg hover-scale"
                        >
                            Get Started
                        </Link>
                    </div>
                    <button 
                        onClick={scrollToFeatures} 
                        className="btn btn-link text-white mt-4 animate-bounce"
                    >
                        Learn More <i className="fas fa-arrow-down"></i>
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section id="features-section" className="features-section py-5">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold text-dark">Why Choose Us?</h2>
                    <div className="row g-4">
                        <div className="col-md-4 col-sm-12 text-center feature-card">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-paint-brush fa-3x text-primary"></i>
                            </div>
                            <h3 className="h4 fw-bold">Unique Artworks</h3>
                            <p className="text-muted">Discover one-of-a-kind graffiti pieces from talented artists worldwide.</p>
                        </div>
                        <div className="col-md-4 col-sm-12 text-center feature-card">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-shipping-fast fa-3x text-primary"></i>
                            </div>
                            <h3 className="h4 fw-bold">Fast Delivery</h3>
                            <p className="text-muted">Get your favorite artworks delivered quickly and securely.</p>
                        </div>
                        <div className="col-md-4 col-sm-12 text-center feature-card">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-headset fa-3x text-primary"></i>
                            </div>
                            <h3 className="h4 fw-bold">24/7 Support</h3>
                            <p className="text-muted">Our team is always here to assist you with any questions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer bg-dark text-white text-center py-4">
                <div className="container">
                    <p className="mb-0">© 2025 Graffiti Art. All rights reserved.</p>
                    <div className="mt-2">
                        <Link to="/terms" className="text-white text-decoration-none me-3">Terms</Link>
                        <Link to="/privacy" className="text-white text-decoration-none">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
