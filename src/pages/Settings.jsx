import { useState, useEffect } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { Settings } from "lucide-react";
import MFASettings from "../components/MFAsettings";
import PasswordSettings from "../components/PasswordSettings";
import DangerZone from "../components/DangerZone";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/settings.css";

export default function ChangeSettings()
{
    // Show message when login fails
    const [error, setError] = useState("");

    useEffect(() => {
      document.title = "VaultSec | Settings";
    }, []);
    
    return (
        <div className="regular-page-layout">

            <Header/>

                <div className="regular-page">

                    <div className="title-section">
                        <div className="page-title-container">
                            <Settings size={32} color="var(--surface)" />
                            <h2 className="page-title">Your Settings</h2>
                        </div>
                        <h3 className="page-subheading">Manage your account settings and security</h3>
                    </div>

                    {error && <p>{error}</p>}

                    <div className="settings-container">
                        <div className="settings-card">
                            <div className="settings-card-header">
                                <div className="settings-info">
                                    <h3>Two-Factor Authentication</h3>
                                    <p className="setting-description">Add an extra layer of security to your account</p>
                                </div>
                                <MFASettings />
                            </div>
                        </div>

                        <div className="settings-border-bottom"></div>

                        <div className="settings-card">
                            <div className="settings-card-header">
                                <div className="settings-info">
                                    <h3>Change Password</h3>
                                    <p className="setting-description">Update your account password</p>
                                </div>
                                <PasswordSettings />
                            </div>
                        </div>

                        <div className="settings-border-bottom"></div>

                        <div className="settings-card danger-settings-card">
                            <div className="settings-card-header">
                                <div className="settings-info">
                                    <h3>Delete Account</h3>
                                    <p className="setting-description">Permanently delete your account and all associated data</p>
                                </div>
                                <DangerZone />
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>

        </div>
    )
}