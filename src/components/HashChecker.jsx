import { useState, useEffect } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { Link } from "react-router-dom"; // Enables redirecting after successful login (else user logs in and stays on same page)
import { Fingerprint } from "lucide-react";

import { HASHCHECK_ALGORITHMS } from "../constants/algorithms";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/hash-checker.css";

export default function HashChecker()
{
    const [file, setFile] = useState(null);

    const [algorithm, setAlgorithm] = useState("SHA-256");

    const [result, setResult] = useState(null);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [copied, setCopied] = useState(false);

    const [expectedHash, setExpectedHash] = useState("");

    const [match, setMatch] = useState(null);

    useEffect(() => {
      document.title = "VaultSec | Hash Checker";
    }, []);

    const handleHashCheck = async (e) => {
        
        e.preventDefault();
        setResult(null);
        setLoading(true);
        setError("");

        try
        {
            const arrayBuffer = await file.arrayBuffer();
            const digest =  await crypto.subtle.digest(algorithm, arrayBuffer);
            const hashArray = Array.from(new Uint8Array(digest));
            const hexString = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setResult(hexString);
            if (expectedHash)
            {
                setMatch(hexString === expectedHash.trim().toLowerCase());
            }
        }
        catch (error)
        {
            console.error(error);
            setError("Hash could not be obtained");
        }
        finally
        {
            setLoading(false);
        }
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="regular-page-layout">
            <Header />

            <div className="regular-page">
                <div className="title-section">
                    <div className="page-title-container">
                        <Fingerprint size={32} color="var(--surface)"/>
                        <h2 className="page-title">Hash Checker</h2>
                    </div>
                    <h3 className="page-subheading">Identify and verify cryptographic hash values</h3>
                </div>

                <div className="generate-hash-container">
                    <div className="dropdown-textarea-container">

                        <div className="hashing-textarea">
                            <p className="textarea-title">Load a file</p>
                            <label className="file-upload-label">
                                {file ? file.name : "Choose a file"}
                                <input type="file"
                                   onChange={(e) => setFile(e.target.files[0])}
                                   style={{display: "none"}}
                                />
                            </label>
                        </div>

                        <div className="hash-alg-dropdown">
                            <p className="dropdown-title">Choose your hashing algorithm</p>
                            <select className="input-field"
                                value={algorithm}
                                onChange={(e) => setAlgorithm(e.target.value)}>
                                {HASHCHECK_ALGORITHMS.map(({value, label}) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>

                        

                        <div className="expected-hashing-textarea">
                            <p className="textarea-title">Paste expected hash (optional)</p>
                            <textarea className="input-field"
                                value={expectedHash}
                                onChange={(e) => setExpectedHash(e.target.value)}
                                rows="6"
                                cols="40"
                            ></textarea>
                        </div>

                        <button className="hash-submit-button" type="submit" onClick={handleHashCheck}>
                            {loading ? "Checking..." : "Check Hash"}
                        </button>
                    </div>
                    
                    {error && <p className="error">{error}</p>}

                    {result && (
                        <div className="hash-result-container">
                            <div className="hash-result">{result}</div>
                            <button className="hash-copy-button" onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
                            {match !== null && (
                                <p style={{color: match ? "#16A34A" : "#DC2626"}}>
                                    {match ? "✓ Match" : "✗ No Match"}
                                </p>
                            )}
                        </div>
                    )}
                </div>
                
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