// Utility function to display expiry status in JWT Decoder 
export function jwtValidity(payload)
{
    // Check whether the payload is expired
    // payload.exp = Unix timestamp in seconds (number of seconds since 1970)
    const expired = payload.exp < (Date.now() / 1000);

    const expiryColour = expired ? "#DC2626" : "#16A34A";

    const message = expired ? "Expired" : "Valid";

    // Convert the issued at to human-readable string
    const issuedAt = new Date(payload.iat * 1000).toLocaleString();

    // Convert the expiry time to human-readable string
    const expiresAt = new Date(payload.exp * 1000).toLocaleString();

    return {expired: expired,
            colour: expiryColour,
            message: message,
            issuedAt: issuedAt,
            expiresAt: expiresAt
    };
}