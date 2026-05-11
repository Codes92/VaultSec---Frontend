import { useState } from "react";
import { useAuth } from "../services/AuthContext";
import { decryptSecret } from "../utils/crypto";
import { clipboard } from "../utils/clipboard";

import logo from "../assets/logo.png";

import "../styles/secret-entry.css"

export default function SecretEntry({secret, onDelete})
{
    const [error, setError] = useState("");

    // setIsRevealed is called by the revealed button to toggle visibility
    const [isRevealed, setIsRevealed] = useState(false);
    // setCopied called by copy button to briefly show "Copied!"
    const [copied, setCopied] = useState(false);
    // setDecryptedValue called to store decrypted text
    const [decryptedValue, setDecryptedValue] = useState(null);

    const {cryptoKey} = useAuth();

    const handleReveal = async () => {
        console.log(cryptoKey);
        try
        {
            const decrypted = await decryptSecret(secret.encryptedBlob, secret.iv, cryptoKey);
            setDecryptedValue(decrypted)
            setIsRevealed(true);
        }
        catch (error)
        {
            console.log(error);
            setError(error.message);
        }
    }

    const handleHide = async () => {
        setIsRevealed(false);
        setDecryptedValue(null);
    }

    const handleCopy = async () => {
        try
        {
            const decrypted = await decryptSecret(secret.encryptedBlob, secret.iv, cryptoKey);
            await clipboard(decrypted);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (error)
        {
            setError(error.message);
        }
    }

    return (
        <div>
            <div className="secret-entry">
                <div className="name-key-container">
                    <p className="secret-name">{secret.name} :</p>
                    <p className="secret-data">{isRevealed ? decryptedValue : "••••••••"}</p>
                    <img src={logo} alt="Vault Logo" className="navbar-logo" />
                </div>
                <div className="secret-entry-buttons">
                    <button className="reveal-button" onClick={isRevealed? handleHide : handleReveal}>{isRevealed ? "Hide" : "Reveal"}</button>
                    <button className="copy-button" onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
                    <button className="vault-delete-button" onClick={() => onDelete(secret.secretId)}>Delete</button>
                </div>
            </div>
            <div className="secret-entry-border">
            </div>
        </div>
        
    );
}