import { useState } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { useAuth } from "../services/AuthContext"; // Connect page to global authentication state
import { useNavigate, Link } from "react-router-dom"; // Enables redirecting after successful login (else user logs in and stays on same page)

import { totpChallenge } from "../services/api";

import Footer from "../components/Footer";

export default function TotpChallenge()
{
    // Store the 6-digit code
    const [digitCode, setDigitCode] = useState("");

    // Show message when login fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);

    const {mfaPendingToken, completeMfaLogin} = useAuth();

    // Enables user to be routed after login success
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError("");

        try
        {
            const response = await totpChallenge(mfaPendingToken, digitCode);
            completeMfaLogin(response);
            navigate('/vault');
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
        <div className="auth-page">
            <div className="auth-header">
                <h1>VaultSec</h1>
                <p>Your On-Hand Secrets Vault</p>
            </div>
            <div className="auth-form">
                <h2 className="auth-title">Enter your MFA passcode</h2>

                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    
                    <input className="input-field"
                           type="text"
                           value={digitCode}
                           onChange={(e) => setDigitCode(e.target.value)}
                           placeholder="6-digit-code"
                           maxLength={6}       
                    />

                    <button className="submit-button" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="sign-up">Don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
            <p className="security-badge">🔒 End-to-end encrypted</p>
            <Footer/>
        </div>
    )
}