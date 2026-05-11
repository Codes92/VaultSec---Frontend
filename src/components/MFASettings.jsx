import { useState, useEffect } from "react";
import { totpStatusChecker, totpDisable, totpSetup, totpVerify } from "../services/api";

import "../styles/mfa-settings.css";

export default function MFASettings()
{
    const [totpEnabled, setTotpEnabled] = useState(null);
    
    const [qrCode, setQrCode] = useState("");

    const [code, setCode] = useState("");

    // Show message when login fails
    const [error, setError] = useState("");

    // Store what stage of flow user is on
    const [step, setStep] = useState("idle"); //idle, setup, verify, complete

    // Store the input so the user can change MFA status
    const [password, setPassword] = useState("");
    // Modal to store password for when user changes MFA status
    const [showMFAModal, setShowMFAModal] = useState(false);

    const [recoveryCodes, setRecoveryCodes] = useState("");

    useEffect(() => {
      document.title = "VaultSec | TOTP";
    }, []);

    useEffect(() => {
        const checkStatus = async () => {
            try
            {
                const data = await totpStatusChecker();
                setTotpEnabled(data.status);
            }
            catch (error)
            {
                setError(error.message);
            }
        }
        checkStatus();
    }, []);

    const handleMFAStatusChange = async () => {
        try
        {
            await totpDisable(password);
            setTotpEnabled(false);
            setStep("idle");
            setShowMFAModal(false);
            setPassword("");
        }
        catch (error)
        {
            setError(error.message);
        }
    }

    const handleEnableMFA = async () => {
        try
        {
            const response = await totpSetup();
            setQrCode(response.qrCode);
            setStep("setup");
        }
        catch (error)
        {
            setError(error.message);
        }
    }

    const handleVerify = async () => {
        console.log("code length:", code.length)
        try
        {
            if (!code || code.length !== 6 || !/^\d{6}$/.test(code))
            {
                setError("Please enter a 6-digit code");
                return;
            }
            const response = await totpVerify(code);
            if (response)
            {
                setStep("complete");
                setTotpEnabled(true);
            }
        }
        catch (error)
        {
            setError(error.message);
        }
    }

    return (
        <div>
            <div className="mfa-change-container">
                {totpEnabled === true ? (
                    <button className="toggle-mfa-button" onClick={() => setShowMFAModal(true)}>
                        Disable MFA
                    </button>
                ) : totpEnabled === false && step === "idle" ? (
                    <button className="toggle-mfa-button" onClick={() => {handleEnableMFA()}}>
                        Enable MFA
                    </button>
                ) : step === "setup" ? (
                    <div className="modal-overlay">
                        <div className="modal">
                            <img className="qr-code-image" src={qrCode} />
                            <input className="input-field" 
                                type="text"
                                placeholder="6-digit code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            {error && <p className="error">{error}</p>}
                            <div className="enable-mfa-buttons">
                                <button className="mfa-modal-cancel" onClick={() => setStep("idle")}>Cancel</button>
                                <button className="verify-mfa-button" onClick={() => handleVerify()}>
                                    Verify
                                </button>
                            </div>
                        </div>
                    </div>
                    
                ) : step === "complete" ? (
                    <div>
                        <button className="toggle-mfa-button" onClick={() => setShowMFAModal(true)}>
                            Disable MFA
                        </button>
                        <p>Success!</p>
                    </div>
                ) : (
                    <p className="loading-message">Loading MFA status...</p>)
                }
            </div>
            
            {showMFAModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Enter your password</h3>
                        <input className="input-field" 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <div className="error-container">
                                <p className="error">{error}</p>
                            </div>
                        )}
                        <div className="modal-buttons">
                            <button className="modal-cancel" onClick={() => setShowMFAModal(false)}>Cancel</button>
                            <button className="modal-confirm" onClick={handleMFAStatusChange}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}