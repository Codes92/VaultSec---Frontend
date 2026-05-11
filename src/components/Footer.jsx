import { Shield } from "lucide-react";

import "../styles/footer.css"

export default function Footer()
{
    return (
        <footer className="footer-wrapper">

            <div className="footer-inner">
                <div className="footer-left">
                    <p className="footer-policy-link"><Shield size={24} color="var(--surface)" /> Built with security in mind</p>
                    <p className="footer-copyright">© 2026 VaultSec. All rights reserved.</p>
                </div>

                <div className="footer-right">
                    <a href="github-url-temp" target="_blank">Github</a>
                    <a href="linkedin-url-temp" target="_blank">LinkedIn</a>
                    <a className="footer-policy-link" href="security-policy-url-temp" target="_blank"><Shield size={24} color="var(--surface)"/>Security Policy</a>
                </div>
            </div>
            
        </footer>
    );
}