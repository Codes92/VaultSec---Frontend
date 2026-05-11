import { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import BasicFooter from "../components/BasicFooter";

import "../styles/auth.css"
import "../styles/footer.css"

/* Define the register page */
export default function Register()
{
    // Store email input
    const [email, setEmail] = useState("");
    // Store password input
    const [password, setPassword] = useState("");

    // Request login function from AuthContext
    const {register} = useAuth();

    // Show message message when registration fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);

    // Enables user to be re-routed after registration success
    const navigate = useNavigate();

    useEffect(() => {
      document.title = "VaultSec | Register";
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError("");

        try
        {
            await register(email, password);
            navigate("/vault");
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
                <h2 className="auth-title">Register</h2>

                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input className="input-field"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <input className="input-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button className="submit-button" type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="sign-up">Already have an account? <Link to="/login">Login</Link></p>
            </div>
            <p className="security-badge">🔒 End-to-end encrypted</p>
            <BasicFooter />
        </div>
    );
}