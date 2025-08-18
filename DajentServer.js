//DajentServer.js

//Imports
//Remember that generateCodeChallenge is async.
import {newCodeVerifier, generateCodeChallenge, openBrowser, reqAccessToken} from './bin/ServerFunctions.js';
import http from 'node:http';
import https from 'node:https';
import { readFileSync } from 'node:fs';
import express from 'express';

import { generateUserAuthReqPage } from './pages/UserAuthReqPage.js';

//Variables and Callbacks
const PORT_HTTP = 8000;
const PORT_HTTPS = 8080;

const app = express();

//Create code challenge
const code_verifier = newCodeVerifier();
const code_challenge =  await generateCodeChallenge(code_verifier);

//Middleware
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.send('Hello, world! This is Dajent!');
});

//---make an authorization request
app.get('/request_user_authentication', function(req, res) {
    const req_page = generateUserAuthReqPage(code_verifier, code_challenge);
    res.render('Dajent', {insert: req_page});
});

//---catching the authorization callback
app.get('/callback', async function(req, res) {
    const authorization_code = req.query.code;
    const token = await reqAccessToken(code_verifier, authorization_code);
    res.redirect('/success');
});

app.get('/success', function(req, res) {
    res.send('Token aquisition successful');
});

//Set up the server
const credentials = {
    key: readFileSync('./dev_secrets/private-key.pem'),
    cert: readFileSync('./dev_secrets/certificate.pem')
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(PORT_HTTP);
httpsServer.listen(PORT_HTTPS);

console.log(`Dajent HTTP Server listening on port ${PORT_HTTP}.`);
console.log(`Dajent HTTP Server listening on port ${PORT_HTTPS}.`);

//Automatically open the browser
openBrowser(`https://localhost:${PORT_HTTPS}/request_user_authentication`);