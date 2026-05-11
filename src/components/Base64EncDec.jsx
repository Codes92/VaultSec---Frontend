import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Code, Copy } from "lucide-react"

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/encoder-decoder.css";

export default function Base64EncoderDecoder()
{
    const [input, setInput] = useState("");

    const [result, setResult] = useState("");

    const [error, setError] = useState("");

    // setCopied called by copy button to briefly show "Copied!"
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      document.title = "VaultSec | Base64 Encoder";
    }, []);

    const handleEncode = () => {
        setError("");
        try
        {
            setResult(btoa(input));
        }
        catch (err)
        {
            console.error(err);
            setError("Input contains characters that cannot be encoded");
        }
    }

    const handleDecode = () => {
        setError("");
        try
        {
            setResult(atob(input));
        }
        catch (err)
        {
            console.error(err);
            setError("Invalid Base64 string");
        }
    }
    
    const handleCopy = async () => {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="regular-page-layout">
            <Header/>
            <div className="regular-page">
                <div className="title-section">
                    <div className="page-title-container base-six-four-title-container">
                        <Code size={32} color="var(--surface)" />
                        <h2 className="page-title">Base 64 Encoder/Decoder</h2>
                    </div>
                    <h3 className="page-subheading">Convert text or binary data to safe ASCII characters</h3>
                </div>

                <div className="encode-input-container">
                    <p>Enter text or a binary string</p>
                    <input className="input-field"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. google.com"
                        maxLength={253}       
                    />
                    <div className="encode-decode-buttons">
                        <button className="encode-button" onClick={handleEncode}>
                            Encode
                        </button>
                        <button className="decode-button" onClick={handleDecode}>
                            Decode
                        </button>
                    </div>
                </div>

                {error && <p className="error">{error}</p>}

                {result && (
                    <div className="base64-result-container">
                        <p className="result-title">Result</p>
                        <p className="base64-result">{result}</p>
                        <button className="base-64-copy-button" onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
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