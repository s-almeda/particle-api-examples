/*
ParticleAPI Nodejs example code
Prepared by Shm Garanganao Almeda for DES INV202

*/

//Node modules to *require*
//if these cause errors, be sure you've installed them, ex: 'npm install express'
const express = require('express');
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
//if there's no url extension, it will show "index.html"
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/"));
    request('http://www.google.com', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body) // Print the google web page.
        }
    })
});

//depending on what url extension the user navigates to, send them the respective html file. 
app.get('/a', function (req, res) {
    res.sendFile(publicPath + '/a.html');
});
app.get('/b', function (req, res) {
    res.sendFile(publicPath + '/b.html');
});
app.get('/c', function (req, res) {
    res.sendFile(publicPath + '/c.html');
});


//run this server by entering "node App.js" using your command line. 
   app.listen(port, () => {
     console.log(`Server is running on http://${host}:${port}`);
   });



