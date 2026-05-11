import { useState, useEffect } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

import { httpHeadersCheck } from "../services/api";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/regular-page.css";
import "../styles/http-checker.css";

export default function HTTPHeadersCheck()
{
    const [domain, setDomain] = useState("");

    // Show message when login fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState(null);

    useEffect(() => {
      document.title = "VaultSec | HTTP Checker";
    }, []);

    const handleHeadersCheck = async (e) => {
    
        e.preventDefault();
        setResults(null);
        setLoading(true);
        setError("");

        try
        {
            const response = await httpHeadersCheck(domain);
            setResults(response);
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
            <Header />
            <div className="regular-page">
                <div className="title-section">
                    <div className="page-title-container">
                        <FileText size={32} color="var(--surface)"/>
                        <h2 className="page-title">HTTP Headers Analyzer</h2>
                    </div>
                    <h3 className="page-subheading">Inspect HTTP responses from websites</h3>
                </div>


                <div className="dns-check-form">
                    <p>Enter a domain name</p>
                    <form onSubmit={handleHeadersCheck}>
                        <input className="input-field"
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="e.g. google.com"
                            maxLength={253}       
                        />

                        <button className="submit-button" type="submit" disabled={loading}>
                            {loading ? "Analyzing..." : "Analyze HTTP headers"}
                        </button>
                    </form>
                </div>

                {error && <p className="error">{error}</p>}

                {results && (
                    <div className="http-results-container">
                        <div className="sec-headers-data-container">
                            <p className="sec-headers-title">Security Headers</p>
                            <div className="sec-headers-data">
                                {Object.entries(results.securityHeaders).map(([header, value]) => (
                                    <div key={header}>
                                        <span>{header}</span>
                                        <span className="sec-header-span">{value ? "✓ Present" : "✗ Missing"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="all-headers-data-container">
                            <p className="all-headers-title">All headers</p>
                            <div className="all-headers-data">
                                {Object.entries(results.headers).map(([header, value]) => (
                                    <div key={header}>
                                        <span>{header}</span>
                                        <span className="all-header-span">{value}</span>
                                    </div>
                                ))}
                            </div>
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
            <Footer />
        </div>
    )
}