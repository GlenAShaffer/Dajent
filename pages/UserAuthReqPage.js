//UserAuthReqPage.js

export function generateUserAuthReqPage(code_verifier, code_challenge){
    const page = `
    <p>Redirecting to Spotify for user authorization.</p>
    <script>
        const clientId = 'a4800ce21bd4427aad8f0823220cf283';
        const redirectUri = 'https://127.0.0.1:8080/callback';

        const scope = '';
        const authUrl = new URL("https://accounts.spotify.com/authorize")

        // generated in the previous step
        window.localStorage.setItem('code_verifier', '${code_verifier}');

        const params =  {
        response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: '${code_challenge}',
            redirect_uri: redirectUri,
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    </script>
    `;
    return page;
};