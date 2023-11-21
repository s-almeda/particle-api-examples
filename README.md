Hello friend! 
This contains a bunch of examples of using the Particle API to control your Particle Devices but from JavaScript or Python code ooooh wow so hacker so coder so cool 

Here are some instructions for running the examples.
# Code for your Particle Device #
[Here's the code I have running on my Photon2 for these examples.](https://go.particle.io/shared_apps/655c6ab601c67402c39a55f3)
It's just the "Web-Connected LED" Example app, with a few additions.
Flash this to your device, then optionally wire up an led to pin D0 (Or you can just look at the on-board blue D7 LED; the example code will blink both D0 and D7.)

## Get your access token! ##
*If you don't do this, the example code will give you errors !*
It would be spooky if literally anyone could hack into your Particle device. That's why you have to use a super secret token ( a password) to get access to your Particle account data/devices/etc. 

Go to [this page](https://docs.particle.io/reference/cloud-apis/access-tokens/#create-a-token-browser-based-) to generate your special super secret *access token* !!

You'll need to either directly add this access token to each code file, or (preferable) add it as an [environment variable.](https://docs.particle.io/reference/cloud-apis/access-tokens/#create-a-token-browser-based-)  

Either way, look for these lines in the .js files:
``const myDevice = 'rabbit_snail'; //Replace this with YOUR device id! 
const accessToken = ''; // PUT YOUR ACCESS TOKEN HERE! ``

And look for these lines in the .py files:
``myDevice = 'rabbit_snail'; # Replace this with YOUR device id! 
particle_access_token = '' # replace this with YOUR ACCESS TOKEN HERE``

rabbit_snail is the name of *my* Photon2 and I left access token is blank so you don't hack her!! so be sure to change both of these to correspond to YOURS, and don't publish your access tokens to GitHub either okay?! :3

# Running the JavaScript and Python code #

We're going to be using a command-line interface.
(I'm writing this from the perspective of a Mac user using Terminal (zsh). If you're a Windows user, you might use Powershell. If you use Visual Studio Code, you might find [this page](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-beginners-tutorial)
 helpful.)
 ### Step 1. [Clone this repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to your computer.

# Node.js / JavaScript Examples: # 
Once you've got this repo cloned, [navigate to the javascript-examples directory](https://www.macworld.com/article/221277/command-line-navigating-files-folders-mac-terminal.html)
(ex: ``$ cd particle-api-examples/javascript-examples``)
### 2. [Make sure you have Node and npm installed for the javascript examples.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 

Check to see if you can run  ``$ node -v`` and ``$ npm -v`` (My versions are v18.16.1 for node and 9.5.1 for npm.)
### 3. Install the necessary modules using npm: 
ex: ``$ npm install``


## There are 3 JavaScript examples included! 
Two are simpler example scripts:
- ``$ node onLedExample.js`` will try to turn your LEDs (D0 and D7) on. 
- ``$ node listDevicesExample.js`` will try to print out your device list. 

And the third is a whole web app!
- ``$ node App.js`` will run the app, after which you should see the message ``Server is running on http://localhost:8000``

If you instead see an error message like ``Error: Cannot find module 'express'``  or something like that-- return to step 3. 
### 5. View your website
Open a web browser (e.g. Google Chrome) to this URL: ``http://localhost:8000/``

You should see a delicious and fabulously designed website! Nice!
### 6. Make these files your own!

Edit the **index.html** file and/or the **CSS stylesheet** to make the web app your own! 

Edit **App.js** if you want to add new functions, add new pages, change how pages route to one another or call functions. 

Note that if you update a .js file, you'll need to call ``$ node thatfile.js`` again to see the changes. If your terminal is too busy running something to listen to you, you can use ``CTRL+C`` to exit!

# Flask/Python Examples: # 

Once you've got this repo cloned, [navigate to the python-examples directory](https://www.macworld.com/article/221277/command-line-navigating-files-folders-mac-terminal.html)
(ex: ``$ cd particle-api-examples/python-examples``)
### 2. [Make sure you have pip and python installed for the python examples.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 

Check to see if you can run  ``$ python --version`` and ``$ pip --version`` (My versions are v3.11.5 for python and 23.3 for pip.)

> It is actually often quite important that you're using python3 instead of python2. If ``$ python --version`` returns 2.xyz instead of 3.xyz, try ``$ python3 --version`` -- if that works, you should keep using ``$ python3`` moving forward! 

### 3. Install the necessary modules using pip.
I think you really just need to run:
``$ pip install flask``
``$ pip install requests``
But just in case, I've made a list of all of my pip modules and put it into  requirements.txt, which you can install in one go using ``$ pip install -r requirements.txt``


## There are 3 Python examples included! 
Two are simpler example scripts:
- ``$ node controlLed.py`` will try to turn your LEDs (D0 and D7) on, or off (try editing line 19)!!
- ``$ node listDevicesExample.py`` will try to print out your device list. 

And the third is a whole web app!
- ``$ python flaskExample.py`` will run the app, after which you should see ``Running on http://127.0.0.1:3000`` among other messages. 

If you instead see an error message like ``ModuleNotFoundError: No module named 'requests'``  or something like that-- return to step 3. 
### 5. View your website
Open a web browser (e.g. Google Chrome) to this URL: ``http://localhost:3000/``

You should see a delicious and fabulously designed website! Nice!
### 6. Make these files your own!

Edit the **templates/index.html** file and/or the **CSS stylesheet** to make the web app your own! 

Edit **flaskExample.py** if you want to add new functions, add new pages, change how pages route to one another or call functions. 

I left lots of cute lil comments and quips, plus an easter egg that fellow pop-punk fans will enjoy. 
I hope this helps!
love and sparkles,
shm
