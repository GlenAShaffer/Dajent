//ServerFunctions.js
import { exec } from 'node:child_process';
import { platform } from 'node:process';
import { request } from 'node:https';

//A function for opening a browser window to a specific url.
//This function requires logic to determine the OS.
//Make sure that xdg-open will recognize the url as a url and not a resource location.
export function openBrowser(url){
    let command;
    if(platform == 'linux'){
        command = `xdg-open ${url}`; //Linux
    }
    //!!!TO DO: add win32!!!

    //!!!TO DO: add Darwin!!!

    exec(command);
}

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
    const hash = await crypto.subtle.digest('SHA-256', encoded_string);
    return btoa(String.fromCharCode(... new Uint8Array(hash))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

//A function for requesting an access token
export async function reqAccessToken(code_verifier, authorization_code) {
    const url = 'https://accounts.spotify.com/api/token';
    const payload = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
        client_id: 'a4800ce21bd4427aad8f0823220cf283',
        grant_type: 'authorization_code',
        code: authorization_code,
        redirect_uri: 'https://127.0.0.1:8080/callback',
        code_verifier: code_verifier,
        }),
    }

    const body = await fetch(url, payload);
    const response = await body.json();
    
    return response.access_token;
}