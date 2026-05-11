import { useState, useEffect } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { Link } from "react-router-dom";
import { dnsLookup } from "../services/api";
import { Search } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/regular-page.css";
import "../styles/dns-lookup.css";

export default function DNSLookup()
{
    const [domain, setDomain] = useState("");

    // Show message when login fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState(null);

    useEffect(() => {
      document.title = "VaultSec | DNS Lookup";
    }, []);

    const handleLookup = async (e) => {

        e.preventDefault();
        setResults(null);
        setLoading(true);
        setError("");

        try
        {
            const response = await dnsLookup(domain);
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
                        <Search size={32} color="var(--surface)"/>
                        <h2 className="page-title">DNS Lookup</h2>
                    </div>
                    <h3 className="page-subheading">Check that a domain name is valid</h3>
                </div>


                <div className="dns-check-form">
                    <p className="tool-title">Enter a domain name</p>
                    <form onSubmit={handleLookup}>
                        <input className="input-field"
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="e.g. google.com"
                            maxLength={253}       
                        />

                        <button className="submit-button" type="submit" disabled={loading}>
                            {loading ? "Checking..." : "Look up DNS"}
                        </button>
                    </form>
                </div>

                {error && <p className="error">{error}</p>}

                {results && (
                    <div className="dns-results-container">
                        <div className="dns-lookup-data">
                            <h3 className="dns-section-heading">A Records</h3>
                            <div className="dns-records">
                                {results.aRecords.length > 0 
                                    ? results.aRecords.map((record, index) => <p className="dns-record" key={index}>{record.data}</p>) 
                                    : <p className="no-records-found-message">No records found</p>
                                }
                            </div>
                        </div>

                        <div className="dns-lookup-data">
                            <h3 className="dns-section-heading">MX Records</h3>
                            <div className="dns-records">
                                {results.mxRecords.length > 0 
                                    ? results.mxRecords.map((record, index) => <p className="dns-record" key={index}>{record.data}</p>) 
                                    : <p className="no-records-found-message">No records found</p>
                                }
                            </div>
                        </div>

                        <div className="dns-lookup-data">
                            <h3 className="dns-section-heading">TXT Records</h3>
                            <div className="dns-records">
                                {results.txtRecords.length > 0 
                                    ? results.txtRecords.map((record, index) => <p className="dns-record" key={index}>{record.data}</p>) 
                                    : <p className="no-records-found-message">No records found</p>
                                }
                            </div>
                        </div>

                        <div className="dns-lookup-data">
                            <h3 className="dns-section-heading">NS Records</h3>
                            <div className="dns-records">
                                {results.nsRecords.length > 0 
                                    ? results.nsRecords.map((record, index) => <p className="dns-record" key={index}>{record.data}</p>) 
                                    : <p className="no-records-found-message">No records found</p>
                                }
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