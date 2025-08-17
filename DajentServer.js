//DajentServer.js

//Imports
//Remember that generateCodeChallenge is async.
import {newCodeVerifier, generateCodeChallenge, openBrowser} from './bin/ServerFunctions.js';
import { createServer } from 'node:http';

//Script
console.log("");

createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World! This is Dajent.');
  res.end();
}).listen(8080);

openBrowser('http://localhost:8080');