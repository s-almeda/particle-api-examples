/*
ParticleAPI Nodejs example code
Prepared by Shm Garanganao Almeda for DES INV202

ABOUT:
This super simple code looks for a function named 'led' and tries to turn it 'on', then stops running. 

if you get any errors, you probably need to install the particle-api-js library: npm install particle-api-js

NOTE: Make sure to change the access token to one that accesses YOUR Particle account!!
You can generate an access token on this page: https://docs.particle.io/reference/cloud-apis/access-tokens/ 
scroll down to where it says **Create a token (browser based)**
*/

//if you get "Error: Cannot find module 'particle-api-js'", you need to run "npm install particle-api-js" to install this !!

var Particle = require('particle-api-js'); 
var particle = new Particle();

const myDevice = 'rabbit_snail'; //Replace this with YOUR device id! 
const accessToken = ''; // PUT YOUR ACCESS TOKEN HERE! 

/* NOTE: you probably don't want to hardcode your access token in your code like this,
// and you definitely don't want to publicly push it to github!! (where anyone could access your account!)
// instead, you should store your access token in an environment variable, e.g. by sending the command:
// "export PARTICLE_AUTH=ACCESSTOKENHERE" into your terminal, then changing line 19 in this file to:
// const accessToken = process.env.PARTICLE_AUTH;
*/

if (!accessToken) {
    console.log('Missing your access token! open up onLedExample.js and put it on line 19.');
    process.exit(1);
}

var turnLedOn = particle.callFunction({ deviceId: myDevice, name: 'led', argument: 'on', auth: accessToken });

turnLedOn.then( 
    function(data) {
        console.log('led on:', data);
    },

);

