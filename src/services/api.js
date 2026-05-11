/* API functions connect the frontend to the backend. React runs in the browser and has no
direct access to the database//authentication. These functions connect
the backend information and relay it in a way that is usable to a human.
*/

/* Base url from which API functions can attach specific routes to */
const BASE_URL = "import.meta.env.VITE_API_URL";

// ==================== AUTHENTICATION API FUNCTIONS ====================
// ======================================================================

/* userLogin authenticates credentials via a post request */
// 1. Export allows other files to import the function
// 2. async enables using await inside the function

export async function userLogin(email, password)
{
    // Send an HTTP request to backend login endpoint
    // await pauses the execution until the server responds
    // Store the result inside response
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json" // Tells server app is sending JSON data (without this, Express won't parse body properly)
        },
        body: JSON.stringify({email, password}) // Converts data into JSON text and sends it in request body
    });

    // Check whether HTTP status indicates success
    if (!response.ok)
    {
        // If not successful, throw error
        const errorData = await response.json();
        throw new Error(errorData.error || "Login Failed");
    }

    // Backend sends back {"token": "...", "email": "..."}
    const data = await response.json();

    return data; // Return {token, email}
}

export async function userRegister(email, password)
{
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration Failed");
    }

    const data = await response.json();

    return data;
}

export async function changePassword(currentPassword, newPassword)
{
    const response = await fetch(`${BASE_URL}/auth/change-password`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({currentPassword, newPassword})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to change password");
    }

    const data = await response.json();

    return data;
}

export async function deleteAccount(password)
{
    const response = await fetch(`${BASE_URL}/auth/delete-account`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete account");
    }

    const data = await response.json();

    return data;
}

// ======================== SECRETS API FUNCTIONS =======================
// ======================================================================

// Get all secrets in the user's vault
export async function getSecrets() 
{
    const response = await fetch(`${BASE_URL}/secrets`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get secrets");
    }

    return response.json();
}

// Add a new secret to the user's vault
export async function addSecret(secretData)
{
    const response = await fetch(`${BASE_URL}/secrets`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(secretData)
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add secret");
    }

    return response.json();
}

// Update a user secret
export async function updateSecret(id, update)
{
    const response = await fetch(`${BASE_URL}/secrets/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update)
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update secret");
    }

    return response.json();
}

// Get secret by id
export async function getSecretById(id)
{
    const response = await fetch(`${BASE_URL}/secrets/${id}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get secret");
    }

    return response.json();
}

// Delete a user secret
export async function deleteSecret(id)
{
    const response = await fetch(`${BASE_URL}/secrets/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete secret");
    }

    return true;
}

// ======================== BREACH API FUNCTIONS ========================
// ======================================================================

// Check whether a password has been breached
export async function breachChecker(password)
{
    if (!password)
    {
        return;
    }

    const response = await fetch(`${BASE_URL}/security/password-check`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to check breach status");
    }

    return response.json();
}

// ========================= TOTP API FUNCTIONS =========================
// ======================================================================

export async function totpStatusChecker()
{
    const response = await fetch(`${BASE_URL}/auth/totp/status`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to check status");
    }

    return response.json();
}

export async function totpSetup()
{
    const response = await fetch(`${BASE_URL}/auth/totp/setup`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to set up TOTP");
    }

    return response.json();
}

export async function totpVerify(code)
{
    const response = await fetch(`${BASE_URL}/auth/totp/verify`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({code})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to verify TOTP");
    }

    return response.json();
}

export async function totpDisable(password)
{
    if (!password)
    {
        return;
    }

    const response = await fetch(`${BASE_URL}/auth/totp/disable`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to disable TOTP");
    }

    return response.json();
}

export async function totpChallenge(mfaPendingToken, code)
{
    if (!mfaPendingToken || !code)
    {
        return;
    }

    const response = await fetch(`${BASE_URL}/auth/totp/challenge`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({mfaPendingToken, code})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to process TOTP challenge");
    }

    return response.json();
}

// ========================== SSL API FUNCTIONS =========================
// ======================================================================

export async function sslChecker(domain)
{
    if (!domain)
    {
        return;
    }

    const response = await fetch(`${BASE_URL}/security/ssl-check`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({domain})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to process SSL check");
    }

    return response.json();
}

// ========================== HASHING API FUNCTIONS =========================
// ==========================================================================

export async function generateHash(input, algorithm)
{
    const response = await fetch(`${BASE_URL}/security/hash`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({input, algorithm})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to generate hash");
    }

    return response.json();
}

// ========================== DNSRECORDS API FUNCTIONS =========================
// =============================================================================

export async function dnsLookup(domain)
{
    const response = await fetch(`${BASE_URL}/security/dns-lookup`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({domain})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to process DNS lookup");
    }

    return response.json();
}

// ========================== HTTPHEADERS API FUNCTIONS =========================
// ==============================================================================
export async function httpHeadersCheck(domain)
{
    const response = await fetch(`${BASE_URL}/security/headers`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({domain})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to check HTTP headers");
    }

    return response.json();
}

// ========================== IP CHECKER API FUNCTIONS ==========================
// ==============================================================================
export async function ipChecker(ipAddress)
{
    const response = await fetch(`${BASE_URL}/security/ip-reputation`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ipAddress})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to check IP");
    };

    return response.json();
}

// ========================== INTELLIGENCE API FUNCTIONS =========================
// ===============================================================================
export async function securityFeed()
{
    const response = await fetch(`${BASE_URL}/intelligence/news`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to retrieve news feed");
    }

    return response.json();
}

export async function cveSearch(search, type)
{
    const response = await fetch(`${BASE_URL}/intelligence/cve-search`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({search, type})
    });

    if (!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.reason || "Failed to retrieve CVE search");
    }

    return response.json();
}