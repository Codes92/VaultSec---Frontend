import { useState } from "react";
import { changePassword } from "../services/api";

export default function PasswordSettings()
{
    // Show message when login fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);

    // Modal to store password for when user changes password
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordError, setPasswordError] = useState(false);

    const [passwordSuccess, setPasswordSuccess] = useState("");

    const handleChangePassword = async () => {

        setError("");
        setPasswordError("");
        setLoading(true);

        try
        {
            if (newPassword !== confirmPassword)
            {
                setPasswordError("Passwords do not match");
                return;
            }

            const response = await changePassword(currentPassword, newPassword);
            if (response)
            {
                setShowPasswordModal(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setPasswordSuccess("Password successfully changed.");
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
        <div>
            <div className="change-password-container">
                <button className="change-password-button" onClick={() => setShowPasswordModal(true)}>
                    Change Password
                </button>
            </div>

            {showPasswordModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Enter your current password</h3>
                        <input className="input-field" 
                            type="password"
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}     
                        />
                        <input className="input-field" 
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input className="input-field" 
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {passwordError && <p className="error">{passwordError}</p>}
                        {error && <p className="error">{error}</p>}
                        <div className="modal-buttons">
                            <button className="modal-cancel" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                            <button className="modal-confirm" onClick={handleChangePassword}>Confirm</button>
                        </div>
                        {passwordSuccess && <p className="password-success">{passwordSuccess}</p>}
                    </div>
                </div>
            )}
        </div>
        
    );
}