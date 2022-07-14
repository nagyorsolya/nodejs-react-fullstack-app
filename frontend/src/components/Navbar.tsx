import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="nav-wrapper darken-3">
            <div className="container">
                <Link to="/drivers" className="brand-logo center">Formula 1 Current placements</Link>
            </div>
        </nav>
    );
};

export default Navbar;