# Welcome to this cool Flask Server example
# make sure to run:
# pip install flask
# pip install requests
"""ParticleAPI Python example code
Prepared by Shm Garanganao Almeda for DES INV202

ABOUT:
This not-too-simple code (but still understandable, I believe in you!) sets up a webserver
that can be accessed by going to http://localhost:3000/ in your browser.
You can run this code by running python controlLed.py in your terminal.

NOTE: Make sure to change the access token to one that accesses YOUR Particle account!!
You can generate an access token on this page: https://docs.particle.io/reference/cloud-apis/access-tokens/ 
Just scroll down to where it says "Create a token (browser based)"
"""

from flask import Flask, jsonify, render_template
import os
import requests

app = Flask(__name__)


myDevice = 'rabbit_snail'; # Replace this with YOUR device id! 

particle_access_token = '' # replace this with YOUR ACCESS TOKEN HERE

"""
NOTE: you probably don't want to hardcode your access token in your code like this,
and you definitely don't want to publicly push it to github!! (where anyone could access your account!)
instead, you should store your access token in an environment variable, e.g. by sending the command:
"export PARTICLE_AUTH=ACCESSTOKENHERE" into your terminal, then changing line 14 in this file to:
particle_access_token =  os.environ.get('PARTICLE_ACCESS_TOKEN')
"""

# Define a default route that renders a simple HTML page
@app.route('/')
def home():
    # this is the HTML file that will be rendered when you go to http://localhost:3000/ in your browser. the contents of this file are located inside the /templates folder!
    return render_template('index.html') 

# ---------- now let's write our fun Particle API calling functions !! -------------------

@app.route('/get_devices', methods=['GET'])
def get_devices():
    particle_api_url = 'https://api.particle.io/v1/devices' # particle API url
    
    # Make the HTTP request to Particle API - in other words, let's ask the Particle website to give us the list of our devices!
    response = requests.get(particle_api_url, params={'access_token': particle_access_token})
    
    if response.ok:
        # If the request was successful, return the JSON response
        return jsonify(response.json())
    else:
        # If there was an error, return an error response
        return jsonify({'error': 'Failed to fetch devices'}), 500


@app.route('/led_on', methods=['GET'])
def led_on():
    try:
        control_led('on')
    except:
        return jsonify({'error': 'Failed to turn led on'}), 500
    return jsonify({'message': 'LED turned on'}), 200
    

@app.route('/led_off', methods=['GET'])
def led_off():
    try:
        control_led('off')
    except:
        return jsonify({'error': 'Failed to turn led off'}), 500
    return jsonify({'message': 'LED turned off'}), 200


@app.route('/blinks', methods=['GET'])
def get_blinks():
    particle_api_url = f'https://api.particle.io/v1/devices/{myDevice}/numberOfBlinks'
    params = {'access_token': particle_access_token}

    try:
        # Make the HTTP request to Particle API
        response = requests.get(particle_api_url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Parse the JSON response
        data = response.json()

        number_of_blinks = data['result']
        print(f'Number of blinks: {number_of_blinks}')

        # Return the data as JSON
        return jsonify({'numberOfBlinks': number_of_blinks})

    except requests.exceptions.RequestException as e:
        # Handle errors
        return jsonify({'error': str(e)}), 500
    


#-- end of our official URL /routes and their corresponding functions --#


# -- helper functions --#
# -- this function will help us control our LED! -- #
def control_led(arg):
    particle_api_url = f'https://api.particle.io/v1/devices/{myDevice}/led'

    # Data to be sent in the POST request
    data = {
        'arg': arg,
        'access_token': particle_access_token
    }

    # Make the HTTP request to control the LED
    response = requests.post(particle_api_url, data=data)

    if response.ok:
        # If the request was successful, return the JSON response
        return response.json()
    else:
        # If there was an error, raise an exception
        response.raise_for_status()


# note that you can write any number of helper functions here. Including functions that summon ChatGPT or do other silly and fun things !
# and then you can use those functions throughout your code in this file! yay! 


# Define the main function to run the app
if __name__ == '__main__':
    app.run(debug=True, port=3000)
