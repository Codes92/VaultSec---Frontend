import { useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import "../styles/catch-all.css";

export default function CatchAll()
{
    useEffect(() => {
      document.title = "VaultSec | Page Not Found";
    }, []);

    return (
        <div className="regular-page-layout">

            <Header />

            <div className="regular-page">
                <div className="pnf-message-container">
                    <div className="pnf-text">
                        <h1 className="pnf-message">
                            404 - Page Not Found
                        </h1>
                        <h3 className="pnf-explanation">
                            This page doesn't exist
                        </h3>
                    </div>
                    <div className="pnf-buttons-container">
                        <Link to="/" 
                            className="back-to-homepage-button">
                            Back to Homepage
                        </Link>
                        <Link to="/vault" 
                            className="back-to-vault-button">
                            Back to Vault
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}