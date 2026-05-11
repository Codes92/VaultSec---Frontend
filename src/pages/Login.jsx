/* This is the login page that users will interact with when using the app

    Things to remember on pages:
        1. React components must return JSX immediately
        2. React components be pure render functions
        3. React needs the component to SYNCHRONOUSLY return UI (not with async functions)

    Flow:
        1. User visits login page (React Router loads login component)
        2. User types in email/password (Stored in email state/password state)
        3. User clicks login (Page calls API login function, gets token, calls login from AuthContext)
        4. Global state changes (user set, isAuthenticated becomes true & entire app re-renders)
        5. Navigate redirects to dashboard

*/

import { useState, useEffect } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { useAuth } from "../services/AuthContext"; // Connect page to global authentication state
import { useNavigate, Link } from "react-router-dom"; // Enables redirecting after successful login (else user logs in and stays on same page)

import Footer from "../components/Footer";

import BasicFooter from "../components/BasicFooter";

import "../styles/auth.css"

export default function Login()
{
    // Store email input
    const [email, setEmail] = useState("");
    // Store password input
    const [password, setPassword] = useState("");

    // Request login function from AuthContext
    const {login, mfaPendingToken} = useAuth();

    // Show message when login fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);
    
    // Enables user to be routed after login success
    const navigate = useNavigate();

    useEffect(() => {
      document.title = "VaultSec | Login";
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError("");

        try
        {
            const data = await login(email, password);
            if (data.mfaPendingToken)
            {
                navigate("/totp-challenge");
            }
            else
            {
                navigate("/vault");
            }
            
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
                <h2 className="auth-title">Welcome Back</h2>

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
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="sign-up">Don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
            <p className="security-badge">🔒 End-to-end encrypted</p>
            <BasicFooter/>
        </div>
    );
}