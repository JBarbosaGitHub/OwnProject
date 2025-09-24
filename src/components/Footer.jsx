import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css';

function Footer() {
    return (
        <footer className="main-footer">
            <div className="social-icons">
                <a href="#" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
            </div>
            <p>Copyright © 2025 Inpi Project. Todos os direitos reservados.</p>
        </footer>
    )
}

export default Footer;