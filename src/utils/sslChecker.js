export function sslCheck(results)
{
    const isValid = results.currentlyValid;

    if (!isValid)
    {
        const errorMessages = {
            'DEPTH_ZERO_SELF_SIGNED_CERT': 'Self-signed certificate',
            'CERT_HAS_EXPIRED': 'Certificate has expired',
            'HOSTNAME_MISMATCH': 'Certificate hostname mismatch'
        };

        const message = errorMessages[results.error] || 'Invalid';

        return {
            colour: "#DC2626",
            message: message
        };
    }

    return {
            colour: "#16A34A",
            message: "Valid"
        };
}