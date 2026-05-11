import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../services/api";

export default function DangerZone()
{
    // Show message when login fails
    const [error, setError] = useState("");
    // Disable button and show spinner during API call
    const [loading, setLoading] = useState(false);

    const [showDZModal, setShowDZModal] = useState(false);

    const [dzPassword, setDZPassword] = useState("");

    const [deleteError, setDeleteError] = useState("");

    const [deleteSuccess, setDeleteSuccess] = useState("");

    // Enables user to be routed after login success
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {

        setError("");
        setDeleteError("");
        setLoading(true);

        try
        {
            const response = await deleteAccount(dzPassword);
            if (response)
            {
                setShowDZModal(false);
                setDZPassword("");
                setDeleteSuccess("Your account was successfully deleted.");
                navigate("/"); /* Return to landing page */
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
            <div className="delete-account-container">
                <button className="delete-account-button" onClick={() => setShowDZModal(true)}>
                    Delete Account
                </button>
            </div>
            
            {showDZModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Enter your current password</h3>
                        <input className="input-field" 
                            type="password"
                            placeholder="Account password"
                            value={dzPassword}
                            onChange={(e) => setDZPassword(e.target.value)}     
                        />
                        {error && <p className="error">{error}</p>}
                        {deleteError && <p className="delete-error">{deleteError}</p>}
                        <div className="modal-buttons">
                            <button className="modal-cancel" onClick={() => setShowDZModal(false)}>Cancel</button>
                            <button className="modal-confirm" onClick={handleDeleteAccount}>Confirm</button>
                        </div>
                        {deleteSuccess && <p className="delete-success">{deleteSuccess}</p>}
                    </div>
                </div>
            )}
        </div>

    );
}