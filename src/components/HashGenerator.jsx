import { useState, useEffect } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { Link } from "react-router-dom"; // Enables redirecting after successful login (else user logs in and stays on same page)
import { Hash } from "lucide-react";

import { generateHash } from "../services/api";
import { HASHING_ALGORITHMS } from "../constants/algorithms";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/hash-generator.css";

export default function GenerateHash()
{
    const [input, setInput] = useState("");

    const [algorithm, setAlgorithm] = useState("sha256");

    const [result, setResult] = useState(null);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    // setCopied called by copy button to briefly show "Copied!"
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      document.title = "VaultSec | Hash Generator";
    }, []);

    const handleHashGenerate = async (e) => {

        e.preventDefault();
        setResult(null);
        setLoading(true);
        setError("");

        try
        {
            const response = await generateHash(input, algorithm);
            setResult(response);
        }
        catch (error)
        {
            console.error(error);
            setError("Input cannot be hashed");
        }
        finally
        {
            setLoading(false);
        }
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(result.hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="regular-page-layout">
            <Header/>

            <div className="regular-page">
                <div className="title-section">
                    <div className="page-title-container">
                        <Hash size={32} color="var(--surface)" />
                        <h2 className="page-title">Hash Generator</h2>
                    </div>
                    <h3 className="page-subheading">Generate a hash from a given text</h3>
                </div>

                <div className="generate-hash-container">
                    <div className="dropdown-textarea-container">
                        <div className="hash-alg-dropdown">
                            <p className="dropdown-title">Choose your hashing algorithm</p>
                            <select className="input-field"
                                value={algorithm}
                                onChange={(e) => setAlgorithm(e.target.value)}>
                                {HASHING_ALGORITHMS.map(({value, label}) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="hashing-textarea">
                            <p className="textarea-title">Type or paste some text</p>
                            <textarea className="input-field"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                rows="6"
                                cols="40"
                            ></textarea>
                        </div>
                    </div>
                    
                    <button className="hash-submit-button" type="submit" onClick={handleHashGenerate}>
                        {loading ? "Hashing..." : "Generate Hash"}
                    </button>
                </div>

                {error && <p className="error">{error}</p>}

                {result && (
                    <div className="hash-result-container">
                        <p className="result-title">Hash Result</p>
                        <div className="hash-result">{result.hash}</div>
                        <button className="hash-copy-button" onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
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