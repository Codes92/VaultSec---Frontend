export const securityTools = [
    {
        category: "Network & Web",
        tools: [
            {
                name: "SSL Checker",
                path: "/ssl-checker",
                icon: "ShieldCheck",
                description: "Inspect the validity of domain certificates",
                status: "Available"
            },
            {
                name: "DNS Lookup",
                path: "/dns-lookup",
                icon: "Search",
                description: "Retrieve DNS records for domain names",
                status: "Available"
            },
            {
                name: "HTTP Headers Analyzer",
                path: "/headers",
                icon: "FileText",
                description: "Inspect HTTP responses from websites",
                status: "Available"
            },
            {
                name: "IP Reputation Checker",
                path: "/ip-reputation",
                icon: "Server",
                description: "Analyze the reputation of IP addresses",
                status: "Available"
            },
            {
                name: "CVE Inspector",
                path: "/cve-checker",
                icon: "AlertTriangle",
                description: "Search known vulnerabilities by CVE identifier",
                status: "Available"
            }
        ]
    },
    {
        category: "Cryptography",
        tools: [
            {
                name: "Hash Generator",
                path: "/generate-hash",
                icon: "Hash",
                description: "Generate secure hashes from input data",
                status: "Available"
            },
            {
                name: "Hash Checker",
                path: "/hash-checker",
                icon: "Fingerprint",
                description: "Identify and verify cryptographic hash values",
                status: "Available"
            },
            {
                name: "Base64 Encoder",
                path: "/encoder-decoder",
                icon: "Code",
                description: "Encode and decord Base64 formatted data",
                status: "Available"
            }
        ]
    },
    {
        category: "Identity & Access",
        tools: [
            { 
                name: "JWT Decoder",
                path: "/jwt-decoder",
                icon: "FileJson",
                description: "Decode and inspect JWT token payloads",
                status: "Available"
            }
        ]
    }
]