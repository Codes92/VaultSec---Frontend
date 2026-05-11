import { useState, useEffect } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { Link } from "react-router-dom";
import { Server } from "lucide-react";

import { ipChecker } from "../services/api";
import { getConfidenceClass } from "../constants/ipRep";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/regular-page.css";
import "../styles/ip-rep.css";

export default function IPRepChecker()
{
    const [ip, setIP] = useState("");

    // Show message when login fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState(null);

    useEffect(() => {
      document.title = "VaultSec | IP Reputation Checker";
    }, []);

    const handleIPCheck = async (e) => {
        
        e.preventDefault();
        setResults(null);
        setLoading(true);
        setError("");

        try
        {
            const response = await ipChecker(ip);
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
                        <Server size={32} color="var(--surface)"/>
                        <h2 className="page-title">IP Reputation Checker</h2>
                    </div>
                    <h3 className="page-subheading">Analyze IP reputation and abuse reports</h3>
                </div>


                <div className="ip-check-form">
                    <p>Enter an IP address</p>
                    <form onSubmit={handleIPCheck}>
                        <input className="input-field"
                            type="text"
                            value={ip}
                            onChange={(e) => setIP(e.target.value)}
                            placeholder="e.g. google.com"
                            maxLength={253}       
                        />

                        <button className="submit-button" type="submit" disabled={loading}>
                            {loading ? "Checking IP" : "Check IP Reputation"}
                        </button>
                    </form>
                </div>

                {error && <p className="error">{error}</p>}

                {results && (
                    <div className="ip-results-container">
                        <div className="ip-basic-validity">
                            <div className="ip-validity-bar" style={{backgroundColor: getConfidenceClass(results.confidenceScore).colour}}>
                                <p>{getConfidenceClass(results.confidenceScore).result}</p>
                            </div>
                        </div>

                        <div className="ip-validity-data">
                            <p>Confidence Score: <span style={{color: getConfidenceClass(results.confidenceScore).colour}}>{results.confidenceScore}</span></p>
                            <p>Country Code: <span className="ip-data-value">{results.country}</span></p>
                            <p>ISP: <span className="ip-data-value">{results.isp}</span></p>
                            <p>Total Reports: <span className="ip-data-value">{results.totalReports}</span></p>
                            <p>Last Report: <span className="ip-data-value">{results.lastReport ? new Date(results.lastReport).toLocaleDateString() : "Never reported"}</span></p>
                            <p>Whitelisted: <span className="ip-data-value">{results.whitelisted ? "Yes" : "No"}</span></p>
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