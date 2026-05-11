import { useState, useEffect } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { Link } from "react-router-dom"; // Enables redirecting after successful login (else user logs in and stays on same page)
import { FileJson } from "lucide-react";

import { jwtValidity } from "../utils/jwtUtils";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/jwt-decode.css"

export default function JWTDecode()
{
    const [input, setInput] = useState("");

    const [header, setHeader] = useState("");

    const [payload, setPayload] = useState("");

    // Show message when login fails
    const [error, setError] = useState("");

    const [expired, setExpired] = useState(null);

    useEffect(() => {
      document.title = "VaultSec | JWT Decoder";
    }, []);

    const handleDecode = () => {
        setError("");
        try
        {
            const token = input.split('.');
            const decodedHeader = JSON.parse(atob(token[0]));
            setHeader(decodedHeader);
            const decodedPayload = JSON.parse(atob(token[1]));
            setPayload(decodedPayload);

            const expiry = jwtValidity(decodedPayload);
            setExpired(expiry);
        }
        catch (error)
        {
            console.error(error);
            setError("JWT token could not be decoded");
        }
    }

    return (
        <div className="regular-page-layout">
            <Header/>
            <div className="regular-page">
                <div className="title-section">
                    <div className="page-title-container jwt-title-container">
                        <FileJson size={32} color="var(--surface)"/>
                        <h2 className="page-title">JSON Web Token Decoder</h2>
                    </div>
                    <h3 className="page-subheading">Decode and inspect the contents of a JSON Web Token</h3>
                </div>

                <div className="encode-input-container">
                    <p>Enter a three-part JWT Token</p>
                    <input className="input-field"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. google.com"
                        maxLength={253}       
                    />
                    <div className="encode-decode-buttons">
                        <button className="decode-button" onClick={handleDecode}>
                            Decode JWT
                        </button>
                    </div>
                </div>

                {error && <p className="error">{error}</p>}

                {header && (
                    <div className="jwt-result-container">
                        <div className="jwt-result-cards">
                            <div className="jwt-header-card">
                                <p className="jwt-card-title">Header</p>
                                <p><span className="jwt-data-key">Algorithm: </span>{header.alg}</p>
                                <p><span className="jwt-data-key">Type: </span>{header.typ}</p>
                            </div>
                            <div className="jwt-payload-card">
                                <p className="jwt-card-title">Payload</p>
                                <p><span className="jwt-data-key">User ID: </span>{payload.userId}</p>
                                <p><span className="jwt-data-key">Email: </span>{payload.email}</p>
                                <p><span className="jwt-data-key">Issued at: </span>{expired.issuedAt}</p>
                            </div>
                        </div>
                        <div className="jwt-status-container">
                            <p style={{color: expired.colour}}>{expired.message}</p>
                            <p><span className="jwt-data-key">Expires: </span>{expired.expiresAt}</p>
                        </div>
                    </div>
                )}
                <div className="back-to-security-tools-container">
                    <Link to="/security-tools" 
                        className="back-to-security-tools-button">
                        Back to Security Tools
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}