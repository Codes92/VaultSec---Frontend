import { createContext, useState, useContext} from "react";
import { userLogin, userRegister } from "./api";

import {deriveEncryptionKey} from "../utils/crypto"

const AuthContext = createContext();

/* Create Provider component */
// The Provider activates the Context
export function AuthProvider({children})
{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [cryptoKey, setCryptoKey] = useState(null);

    const [mfaPendingToken, setMfaPendingToken] = useState(null);

    const [pendingPassword, setPendingPassword] = useState("");

    // Functions to manage auth state
    const register = async (email, password) => {
        try
        {
            const data = await userRegister(email, password);
            setUser({email: data.email, kdfSalt: data.kdfSalt});
            setIsAuthenticated(true); 

            const key = await deriveEncryptionKey(password, data.kdfSalt);
            setCryptoKey(key);

            return data;
        }
        catch (error)
        {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const login = async (email, password) => {
        try
        {
            // Call the API
            const data = await userLogin(email, password);

            if (data.mfaPendingToken)
            {
                setMfaPendingToken(data.mfaPendingToken);
                setPendingPassword(password);
            }
            else
            {
                setUser({email: data.email, kdfSalt: data.kdfSalt}); 
                setIsAuthenticated(true);

                const key = await deriveEncryptionKey(password, data.kdfSalt);
                setCryptoKey(key);
            }

            return data;
        }
        catch (error)
        {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const completeMfaLogin = async (totpResponse) => {
       
        setUser({email: totpResponse.email, kdfSalt: totpResponse.kdfSalt});
        setIsAuthenticated(true);

        const key = await deriveEncryptionKey(pendingPassword, totpResponse.kdfSalt);
        setCryptoKey(key);

        setMfaPendingToken(null);

        setPendingPassword("");
        
    }

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setCryptoKey(null);
    }

    // Export everything into global React space
    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout, cryptoKey, mfaPendingToken, completeMfaLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

/* Custom hook (provides easier access) */
export function useAuth()
{
    return useContext(AuthContext);
}

/* Without the useAuth() function, every component would need:
        import { useContext } from "react";
        import { AuthContext } from "./AuthContext";
        const auth = useContext(AuthContext);
*/