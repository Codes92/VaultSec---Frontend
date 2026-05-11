import { useState } from "react";
import { Link } from "react-router-dom";
import { cveSearch } from "../services/api";

import { AlertTriangle } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

import "../styles/regular-page.css";
import "../styles/cve-checker.css";

export default function CVESearch()
{
    const [searchInput, setSearchInput] = useState("");
    const [cveType, setCVEType] = useState("id");

    // Show message when login fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState(null);

    const handleCVECheck = async (e) => {
        
        e.preventDefault();

        setResults(null);
        setLoading(true);
        setError("");

        try
        {
            const response = await cveSearch(searchInput, cveType);
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
                {error && <p>{error}</p>}
                {loading && <p className="loading-message">Loading...</p>}
                <div className="title-section">
                    <div className="page-title-container">
                        <AlertTriangle size={32} color="var(--surface)"/>
                        <h2 className="page-title">CVE Inspector</h2>
                    </div>
                    <h3 className="page-subheading">Search known vulnerabilities by CVE identifier</h3>
                </div>

                <div className="ssl-check-form">
                    <p className="tool-title">Enter a CVE identifier</p>
                    <form onSubmit={handleCVECheck}>
                        <input className="input-field"
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="e.g. CVE-2021-44228"
                            maxLength={253}       
                        />

                        <button className="submit-button" type="submit" disabled={loading}>
                            {loading ? "Inspecting..." : "Inspect CVE"}
                        </button>
                    </form>
                </div>

                {results && (
                    <div className="cve-results-container">
                        {/* Container for the bar ^^ */}
                        <div className="cve-inspection-title">
                            CVE Inspection
                        </div>
                        <div className="cve-validity-data">
                            <p>ID: <span>{results.id || "Unknown"}</span></p>
                            <p>Summary: <span className="ip-data-value">{results.summary || "No summary available"}</span></p>
                            <p>Details: <span className="ip-data-value">{results.details || "No details available"}</span></p>
                            <p>Also known as: <span className="ip-data-value">{results.aliases?.length > 0 ? results.aliases.join(", ") : "None"}</span></p>
                            <p>Published: <span className="ip-data-value">{results.published ? new Date(results.published).toLocaleDateString() : "Unknown"}</span></p>
                            <p>Modified: <span className="ip-data-value">{results.modified ? new Date(results.modified).toLocaleDateString() : "Unknown"}</span></p>
                            <p>Severity: <span className="ip-data-value">{results.severity || "Unknown"}</span></p>
                            <div className="references-section">
                                <p>References:</p>
                                {results.references?.length > 0 ? (
                                    <ul>
                                        {results.references.map((ref, index) => (
                                            <li key={index}>
                                                <strong>{ref.type}</strong>:{" "}
                                                <a
                                                    href={ref.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {ref.url}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No references available</p>
                                )}
                            </div>

                            <div className="affected-packages-section">
                                <p>Affected Packages:</p>
                                {results.affectedPackages?.length > 0 ? (
                                    <ul>
                                        {results.affectedPackages.map((pkg, index) => (
                                            <li key={index}>
                                                {pkg.ecosystem} - {pkg.name}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No affected packages listed</p>
                                )}
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
    );
}