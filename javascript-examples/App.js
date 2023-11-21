/*
ParticleAPI Nodejs example code
Prepared by Shm Garanganao Almeda for DES INV202
This not-too-simple code (but still understandable, I believe in you!) sets up a webserver
that can be accessed by going to http://localhost:8000/ in your browser.
Run node App.js in your terminal to start the server.
the content of the website itself is in index.html.

*/

//Node modules to *require*
//if these cause errors, be sure you've installed them, ex: 'npm install express' and 'npm install axios', etc
const express = require('express');
const { access } = require('fs');
//const axios = require('axios');
var Particle = require('particle-api-js');
var particle = new Particle();

const myDevice = 'rabbit_snail'; //Replace this with YOUR device id! 
const accessToken = '';// PUT YOUR ACCESS TOKEN HERE!

/* NOTE: you probably don't want to hardcode your access token in your code like this,
// and you definitely don't want to publicly push it to github!! (where anyone could access your account!)
// instead, you should store your access token in an environment variable, e.g. by sending the command:
// "export PARTICLE_AUTH=ACCESSTOKENHERE" into your terminal, then changing line 19 in this file to:
// const accessToken = process.env.PARTICLE_AUTH;
*/



const router = express.Router();
const app = express();
const path = require('path');

//specify that we want to run our website on 'http://localhost:8000/'
const host = 'localhost';
const port = 8000;

var publicPath = path.join(__dirname, 'public'); //get the path to use our "public" folder where we stored our html, css, images, etc
app.use(express.static(publicPath));  //tell express to use that folder

var request = require('request'); //this is a module that allows us to make http requests to other websites!



//here's where we specify what to send to users that connect to our web server...
//the "homepage" of our website will show "index.html"
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/"));
});


/*-- beginning of our fun particle api calling functions! --*/

// when the devicelistbutton on the webpage is clicked, this function will run!
app.get('/listdevices', async (req, res) => {
    console.log("received request");
    // Access the data from the request body
    const requestData = req.body;

    try {
        // Assuming `run()` returns the `particle` instance or initializes it
        const devices = await particle.listDevices({ auth: accessToken });

        // Extract relevant information from devices if needed
        const deviceList = devices.body.map(dev => ({ name: dev.name, id: dev.id }));

        // Send the list of devices back to the client
        res.json({ message: 'List of devices retrieved successfully', devices: deviceList });
    } catch (err) {
        // Handle errors
        console.error('Error listing devices:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// when the ledOnButton on the webpage is clicked, this function will run!
app.get('/ledOn', async (req, res) => {
    console.log("received request to turn LED on..."); // you can view these console messages in your terminal after running node App.js

    var turnLedOn = particle.callFunction({ deviceId: myDevice, name: 'led', argument: 'on', auth: accessToken });
    turnLedOn.then(function(data) {
        console.log('Function called succesfully:', data);
      }, function(err) {
        console.log('An error occurred:', err);
      });
    return res.json({ message: 'LED turned on successfully'});
});

// when the ledOffButton on the webpage is clicked, this function will run!
app.get('/ledOff', async (req, res) => {
    console.log("received request to turn LED OFF...");
    
    var turnLedOff = particle.callFunction({ deviceId: myDevice, name: 'led', argument: 'off', auth: accessToken });
    turnLedOff.then(function(data) {
        console.log('Function called succesfully:', data);
      }, function(err) {
        console.log('An error occurred:', err);
      });
    return res.json({ message: 'LED turned off successfully'});
});

// when the getNumBlinks button on the webpage is clicked, this function will run!
app.get('/blinks', async (req, res) => {
    console.log("received request to get number of blinks...");

    particle.getVariable({ deviceId: myDevice, name: 'numberOfBlinks', auth: accessToken }).then(function(data) {
        console.log('Device variable retrieved successfully:', data);
        // Send the number of blinks back to the client
        res.json({ numberOfBlinks: data.body.result });
      }, function(err) {
        console.log('An error occurred while getting attrs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    return res
});






/*--- end of our fun particle functions! --*/



//run this server by entering "node App.js" using your command line. 
   app.listen(port, () => {
     console.log(`Server is running on http://${host}:${port}`);
   });


if (!accessToken) {
    console.log('Missing your access token! open up App.js and put it on line 19.');
    process.exit(1);
}
