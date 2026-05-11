/**
 * The vault page is the main dashboard the user sees upon login
 * It fetches the user's secrets from the backend, which come back as encrypted blobs.
 * The page then decrypts each secret client side using the AES key stored in context, and displays them as a list
 * 
 * Each secret in the shows:
 *  - name/label - always visible, e.g. "Gmail password"
 *  - value - hidden, only revealed when the user clicks a button
 *  - Copy button - decrypts and copies to keyboard without displaying
 *  - Delete button - removes the secret from the vault
 *  - Edit button - allows updating the name or value
 *  - Add button - opens a form where the user types a name and the secret value
 *              (page encrypts it client side, and sends ciphertext to backend)
 */

import { useEffect, useState } from "react"; // Use state provides memory to the page (otherwise data such as email/password disappears)
import { useAuth } from "../services/AuthContext"; // Connect page to global authentication state
import { addSecret, deleteSecret, getSecrets } from "../services/api";
import { breachChecker } from "../services/api";
import { Vault } from "lucide-react";
import { LockKeyhole } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SecretEntry from "../components/SecretEntry";
import PasswordStrength from "../components/PasswordStrength";
import PasswordGenerator from "../components/PasswordGenerator";

import { encryptSecret } from "../utils/crypto";

import "../styles/regular-page.css"
import "../styles/vault.css"

export default function SecretsVault()
{
    // Request user and logout from AuthContext
    const {user, cryptoKey} = useAuth();

    // Show message when login fails
    const [error, setError] = useState("");

    // Store secrets
    const [secrets, setSecrets] = useState([]);

    const [secretsLoading, setSecretsLoading] = useState(false);

    const [secretName, setSecretName] = useState("");
    const [secretValue, setSecretValue] = useState("");

    const [deleteUserSecret, setDeleteUserSecret] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);

     // Store breach status of password
    const [breachStatus, setBreachStatus] = useState("idle"); // "idle" / "checking" / "safe" / "compromised" / "error"
    // Store number of times breached
    const [breachCount, setBreachCount] = useState(null);

    const [breachError, setBreachError] = useState(null);

    useEffect(() => {
      document.title = "VaultSec | Vault";
    }, []);

    const fetchSecrets = async () => {
        setSecretsLoading(true);
        try
        {
            const data = await getSecrets();
            setSecrets(data.secrets || []);
        }
        catch (error)
        {
            setError(error.message);
        }
        finally
        {
            setSecretsLoading(false);
        }
    }

    useEffect(() => {
        fetchSecrets();
    }, []);

    useEffect(() => {
        if (!secretValue)
        {
            setBreachStatus("idle");
            setBreachCount(null);
            setBreachError(null);
            return;
        }

        if (secretValue.length < 8)
        {
            setBreachStatus("idle");
            return;
        }

        setBreachStatus("checking");

        const timeout = setTimeout(async () => {
            try
            {
                const result = await breachChecker(secretValue);
                if (!result.valid)
                {
                    setBreachStatus("idle");
                    return;
                }
                if (result.compromised)
                {
                    setBreachStatus("compromised");
                    setBreachCount(result.count);
                }
                else
                {
                    setBreachStatus("safe");
                    setBreachCount(null);
                }
                setBreachError(null);
            }
            catch (error)
            {
                setBreachStatus("error");
                setBreachError(error.message);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [secretValue]);

    // Handle add request
    const handleAddSecret = async () => {
        // Validation check to ensure empty secrets can't be placed in the user vault
        if (!secretName.trim() || !secretValue.trim())
        {
            setError("Secret name and value are required.");
            return;
        }

        try
        {
            const {ciphertext, iv } = await encryptSecret(secretValue, cryptoKey);
            const newSecret = await addSecret({name: secretName, encryptedBlob: ciphertext, iv});
            setSecrets(prev => [...prev, newSecret.newSecret]);
            setSecretName("");
            setSecretValue("");
            setShowAddModal(false);
        }
        catch (error)
        {
            setError(error.message);
        }
    }

    // Handle delete request
    const handleDeleteRequest = (secretId) => {
        setDeleteUserSecret(secretId);
    }

    // Handle delete confirm
    const handleDeleteConfirm = async () => {
        try
        {
            await deleteSecret(deleteUserSecret)
            // Refresh secret list after deletion
            setSecrets(prev => prev.filter(s => s.secretId !== deleteUserSecret));
        }
        catch (error)
        {
            setError(error.message);
        }
        finally
        {
            setDeleteUserSecret(null);
        }
    }

    const handleDeleteCancel = () => {
        setDeleteUserSecret(null);
    }

    if (!user)
    {
        return null;
    }

    return (
        <div className="regular-page-layout">

            <Header/>

            <div className="regular-page">
                <div className="title-section">
                    <div className="page-title-container">
                        <Vault size={32} color="var(--primary-light)"/>
                        <h2 className="page-title">Your Secrets Vault</h2>
                    </div>
                    <h3 className="page-subheading">Store your secrets safely</h3>
                </div>
                
                <div className="secrets-container">
                    {secretsLoading ? (
                        <p className="loading-message">Loading your secrets...</p>
                    ) : secrets.length === 0 ? (
                        <div className="empty-vault">
                            <LockKeyhole size={48} color="var(--surface)" />
                            <h3 className="empty-message-heading">Your Vault is Empty</h3>
                            <p className="empty-message-subheading">Add your first secret</p>
                        </div>
                        
                    ) : (
                        secrets.map(secret => (
                            <SecretEntry key={secret.secretId} secret={secret} onDelete={handleDeleteRequest}/>
                        ))
                    )}
                </div>

                <div className="add-secret-container">
                    <button className="add-secret-button" onClick={() => setShowAddModal(true)}>
                        +
                    </button>
                    <p className="add-secret-message">Add a secret</p>
                </div>
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add a new secret?</h3>
                        <input className="input-field" 
                            type="text" 
                            placeholder="Secret name (e.g. GitHub API Key)"
                            value={secretName}
                            onChange={(e) => setSecretName(e.target.value)}
                        />
                        <input className="input-field"
                            type="password"
                            placeholder="Secret value"
                            value={secretValue}
                            onChange={(e) => setSecretValue(e.target.value)}
                        />
                        {secretValue && <PasswordStrength password={secretValue}/>}
                        {breachStatus === "checking" && <p>Checking password safety...</p>}
                        {breachStatus === "safe" && <p>Not found in known breaches</p>}
                        {breachStatus === "compromised" && (
                            <p>⚠ Found in data breaches ({breachCount} times)</p>
                        )}
                        {breachStatus === "error" && (
                            <p>{breachError || "Unable to check right now"}</p>
                        )}
                        
                        <PasswordGenerator onUsePassword={(pwd) => setSecretValue(pwd)}/>
                        {error && <p className="error">{error}</p>}
                        <p>This will be added to your vault.</p>
                        <div className="modal-buttons">
                            <button className="modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="modal-confirm" onClick={handleAddSecret}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteUserSecret && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Delete this secret?</h3>
                        <p>This action cannot be undone.</p>
                        <div className="modal-buttons">
                            <button className="modal-cancel" onClick={handleDeleteCancel}>Cancel</button>
                            <button className="modal-confirm" onClick={handleDeleteConfirm}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
}