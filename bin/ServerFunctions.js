//ServerFunctions.js

//A function for creating a code verifier
//The code verifier must be 43 to 128 characters long, and contain letters, digits, underscores, periods, hyphens, tildes.
export function newCodeVerifier() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(128));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};


//A function for generating a code challenge
//This function should take a code verifier, hash it using SHA256, and then encode it in base64.
//Remember that crypto.subtle.digest is async, and that this function is async.
export async function generateCodeChallenge(code_verifier) {
    const encoder = new TextEncoder();
    const encoded_string = encoder.encode(code_verifier);
    console.log("Encoded text: " + encoded_string);
    const hash = await crypto.subtle.digest('SHA-256', encoded_string);
    console.log("Hash: " + hash);
    return btoa(String.fromCharCode(... new Uint8Array(hash))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

//A function for requesting an authorization code

//A function for requesting an access token