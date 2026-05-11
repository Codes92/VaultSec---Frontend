import { Shield } from "lucide-react";

import "../styles/basic-footer.css";

export default function BasicFooter()
{
    return (
        <footer className="basic-footer-wrapper">

            <div className="basic-footer-inner">
                <p className="footer-policy-link"><Shield size={24} color="var(--surface)" /> Built with security in mind</p>
                <p className="footer-copyright">© 2026 VaultSec. All rights reserved.</p>
            </div>
            
        </footer>
    );
}