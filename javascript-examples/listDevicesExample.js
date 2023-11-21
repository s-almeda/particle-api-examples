/*
ParticleAPI Nodejs example code
Prepared by Shm Garanganao Almeda for DES INV202

ABOUT:
This super simple code lists all the devices associated with your Particle account, then stops running. 
It uses the particle-api-js library. 

NOTE: Make sure to change the access token to one that accesses YOUR Particle account!!
You can generate an access token on this page: https://docs.particle.io/reference/cloud-apis/access-tokens/ 
scroll down to where it says **Create a token (browser based)**
*/

//if you get "Error: Cannot find module 'particle-api-js'", you need to run "npm install particle-api-js" to install this !!

var Particle = require('particle-api-js'); 
var particle = new Particle();

const accessToken = ''; // PUT YOUR ACCESS TOKEN HERE! 

/* NOTE: you probably don't want to hardcode your access token in your code like this,
// and you definitely don't want to publicly push it to github!! (where anyone could access your account!)
// instead, you should store your access token in an environment variable, e.g. by sending the command:
// "export PARTICLE_AUTH=ACCESSTOKENHERE" into your terminal, then changing line 19 in this file to:
// const accessToken = process.env.PARTICLE_AUTH;
*/

if (!accessToken) {
    console.log('Missing your access token! open up listDevicesExample.js and put it on line 19.');
    process.exit(1);
}

function run() {
    particle.listDevices({ auth: accessToken }).then(
        function (devices) {
            for(const dev of devices.body) {
                console.log('name=' + dev.name + ' id=' + dev.id);
            }
        },
        function (err) {
            console.log('List devices call failed: ', err);
        }
    );    
}

run();
