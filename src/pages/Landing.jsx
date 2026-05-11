import { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext"; // Connect page to global authentication state
import { useNavigate, Link } from "react-router-dom"; // Enables redirecting after successful login (else user logs in and stays on same page)
import { Shield, Lock, Globe, Key, EyeOff, Database, Smartphone, Radar } from "lucide-react";

import Footer from "../components/Footer";

import "../styles/auth.css";
import "../styles/landing.css";

export default function Landing()
{

    // Show message when login fails
    const [error, setError] = useState("");

    useEffect(() => {
      document.title = "VaultSec | Secure Your Digital Life";
    }, []);

    return (
        <div className="landing-page">
            <div className="landing-hero">
                <h1>VaultSec</h1>
                <p>Your On-Hand Secrets Vault</p>
                <div className="landing-buttons-container">
                    <Link to={"/login"}><button className="login-link-button">Login</button></Link>
                    <Link to={"/register"}><button className="register-link-button">Register</button></Link>
                </div>
                <div className="scroll-indicator">↓</div>
            </div>

            <div className="features-section">
                <h2>Everything you need, in one place</h2>
                <div className="feature-card-container">
                    <div className="feature-card">
                        <Lock size={32} color="var(--register)" />
                        <h3>Vault</h3>
                        <p>Store passwords and secrets with AES-256 encryption, accessible only to you.</p>
                    </div>
                    <div className="feature-card">
                        <Globe size={32} color="var(--register)" />
                        <h3>Network & Web Security</h3>
                        <p>Analyse SSL certificates, HTTP headers, and DNS records to spot vulnerabilities</p>
                    </div>
                    <div className="feature-card">
                        <Shield size={32} color="var(--register)"/>
                        <h3>IAM</h3>
                        <p>Secure accounts with TOTP two-factor authentication and breach detection</p>
                    </div>
                    <div className="feature-card">
                        <Key size={32} color="var(--register)" />
                        <h3>Cryptography</h3>
                        <p>Generate hashes, encode data, and verify file integrity with leading algorithms</p>
                    </div>
                </div>
            </div>

            <div className="security-points-section">
                <h2>Built with security at its core</h2>
                <div className="security-info-container">
                    <div className="security-info">
                        <EyeOff size={32} color="var(--surface)" />
                        <h3>1. Zero Knowledge Architecture</h3>
                        <p>Client-side encryption of secrets prior to server storage</p>
                    </div>
                    <div className="security-info">
                        <Database size={32} color="var(--surface)" />
                        <h3>2. AES-256 + Argon2</h3>
                        <p>Industry standard encryption and hashing for stored secrets</p>
                    </div>
                    <div className="security-info">
                        <Smartphone size={32} color="var(--surface)" />
                        <h3>3. Two-Factor Authentication</h3>
                        <p>TOTP-based MFA built in - secure accounts with any standard authenticator app</p>
                    </div>
                    <div className="security-info">
                        <Radar size={32} color="var(--surface)" />
                        <h3>4. Real-Time Threat Intelligence</h3>
                        <p>Breach checking against HaveIBeenPwned, SSL analysis, HTTP header scanning</p>
                    </div>
                </div>
            </div>

            <div className="call-to-action">
                <div className="cta-text-container">
                    <h2>Your Secrets Deserve Better Protection</h2>
                    <p>Join VaultSec and take control of your security</p>
                </div>
                <div>
                    <Link to={"/register"}><button className="create-account-button">Create Free Account</button></Link>
                </div>
            </div>

            <Footer/>
        </div>
    )
}