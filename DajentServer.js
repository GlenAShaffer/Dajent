//DajentServer.js

//Imports
//Remember that generateCodeChallenge is async.
import {newCodeVerifier, generateCodeChallenge, openBrowser} from './bin/ServerFunctions.js';
import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';

//Variables
const PORT = 8080;

//Script
const code_verifier = newCodeVerifier();
const code_challenge =  await generateCodeChallenge(code_verifier);

//Server options
const server_options = {
    key: readFileSync('./bin/private-key.pem'),
    cert: readFileSync('./bin/certificate.pem')
};

createServer(server_options, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(`Hello World! This is Dajent.`);
  res.end();
}).listen(8080);

console.log(`Dajent Server listening on port ${PORT}.`);

openBrowser(`https://localhost:${PORT}`);