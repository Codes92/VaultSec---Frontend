import { useState, useEffect } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { Link } from "react-router-dom"; // Enables redirecting after successful login (else user logs in and stays on same page)
import { ShieldCheck, Globe } from "lucide-react";

import { sslChecker } from "../services/api";
import { sslCheck } from "../utils/sslChecker";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/ssl-checker.css";
import "../styles/regular-page.css";

export default function SSLChecker()
{
    const [domain, setDomain] = useState("");

    // Show message when login fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState(null);

    const [validity, setValidity] = useState("");

    useEffect(() => {
      document.title = "VaultSec | SSL Checker";
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setResults(null);
        setLoading(true);
        setError("");

        try
        {
            const response = await sslChecker(domain);
            setResults(response);
            const validity = sslCheck(response);
            setValidity(validity);
        }
        catch (error)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    return (

        <div className="regular-page-layout">
            <Header/>

            <div className="regular-page">
                <div className="title-section">
                    <div className="page-title-container">
                        <ShieldCheck size={32} color="var(--surface)"/>
                        <h2 className="page-title">SSL Checker</h2>
                    </div>
                    <h3 className="page-subheading">Inspect a website’s SSL certificate</h3>
                </div>

                <div className="ssl-check-form">
                    <p className="tool-title">Enter a domain name</p>
                    <form onSubmit={handleSubmit}>
                        <input className="input-field"
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="e.g. google.com"
                            maxLength={253}       
                        />

                        <button className="submit-button" type="submit" disabled={loading}>
                            {loading ? "Checking..." : "Check SSL"}
                        </button>
                    </form>
                </div>
                
                {error && <p className="error">{error}</p>}

                {results && (
                    <div className="ssl-results-container">
                        {/* Container for the bar ^^ */}
                        <div className="ssl-basic-validity">
                            <div className="ssl-validity-bar" style={{backgroundColor: validity.colour}}>
                                <p className="ssl-validity-message">{validity.message}</p>
                            </div>
                        </div>
                        <div className="ssl-validity-data">
                            <p>Valid days remaining: <span className="ssl-data-value">{results.daysRemaining}</span></p>
                            <p>Issuer: <span className="ssl-data-value">{results.issuer?.CN}</span></p>
                            <p>Subject: <span className="ssl-data-value">{results.subject?.CN}</span></p>
                            <p>TLS Version: <span className="ssl-data-value">{results.currentTLSVersion}</span></p>
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