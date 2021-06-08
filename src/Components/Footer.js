import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-light text-muted mt-5">
            <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright @ 
                <a className="text-reset fw-bold link"  rel="noreferrer" href="https://doondukan.com/" target="_blank">DoonDukan.com</a>
            </div>
        </footer>
    );
};

export default Footer;