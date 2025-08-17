//DajentServer.js

//Imports
//Remember that generateCodeChallenge is async.
import {newCodeVerifier, generateCodeChallenge, openBrowser} from './bin/ServerFunctions.js';
import { createServer } from 'node:http';

//Variables
const PORT = 8080;

//Script
createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World! This is Dajent.');
  res.end();
}).listen(8080);

console.log(`Dajent Server listening on port ${PORT}.`);

openBrowser(`http://localhost:${PORT}`);