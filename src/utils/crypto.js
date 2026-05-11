
export async function deriveEncryptionKey(masterPassword, salt)
{
    const encodedPassword = new TextEncoder().encode(masterPassword);

    const makeKey = await crypto.subtle.importKey(
        "raw",              // format
        encodedPassword,    // key material
        "PBKDF2",           // algorithm
        false,              // not extractable
        ["deriveKey"]       // usage
    );

    const AESKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: new TextEncoder().encode(salt),
            iterations: 200000,
            hash: "SHA-256"
        },
        makeKey,                            // imported key
        {name: "AES-GCM", length: 256},     // output key type
        false,                              // not extractable
        ["encrypt", "decrypt"]              // usages
    );

    return AESKey;
};

export async function encryptSecret(plaintext, key)
{
    const generateIV = crypto.getRandomValues(new Uint8Array(12));

    const encodedPlaintext = new TextEncoder().encode(plaintext);

    const ciphertext = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: generateIV,
        },
        key,
        encodedPlaintext
    );

    const base64Ciphertext = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
    const base64IV = btoa(String.fromCharCode(...new Uint8Array(generateIV)));

    return {ciphertext: base64Ciphertext, iv: base64IV};
}

export async function decryptSecret(ciphertext, iv, key)
{
    const ciphertextBytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));

    const plaintext = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: ivBytes
        },
        key,
        ciphertextBytes
    );

    const decryptedSecret = new TextDecoder().decode(plaintext);

    return decryptedSecret;
}

/**
 * 
 * deriveKey(masterPassword, salt) — takes the master password and kdfSalt from context, derives an AES-256-GCM key using PBKDF2 via the Web Crypto API
 * encrypt(plaintext, key) — takes a string and the derived key, returns { ciphertext, iv } as base64 strings
 * decrypt(ciphertext, iv, key) — takes the encrypted blob and IV from the backend, returns the original plaintext string
 *
 */

/**1/2
deriveKey(algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params, baseKey: CryptoKey, derivedKeyType: AlgorithmIdentifier | AesDerivedKeyParams | HmacImportParams | HkdfParams | Pbkdf2Params, extractable: boolean, keyUsages: Iterable<KeyUsage>): Promise<CryptoKey>

The deriveKey() method of the SubtleCrypto interface can be used to derive a secret key from a master key. */