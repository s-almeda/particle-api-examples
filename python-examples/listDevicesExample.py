# Welcome to this cool Flask Server example
# make sure to run:
# pip install requests
"""
Prepared by Shm Garanganao Almeda for DES INV202

ABOUT:
This super simple code lists all the devices associated with your Particle account, then stops running. 
It uses the particle-api-js library. 

NOTE: Make sure to change the access token to one that accesses YOUR Particle account!!
You can generate an access token on this page: https://docs.particle.io/reference/cloud-apis/access-tokens/ 
scroll down to where it says **Create a token (browser based)**
"""

import os
import requests


particle_access_token = '' # replace this with YOUR ACCESS TOKEN HERE

"""
NOTE: you probably don't want to hardcode your access token in your code like this,
and you definitely don't want to publicly push it to github!! (where anyone could access your account!)
instead, you should store your access token in an environment variable, e.g. by sending the command:
"export PARTICLE_AUTH=ACCESSTOKENHERE" into your terminal, then changing line 14 in this file to:
particle_access_token =  os.environ.get('PARTICLE_ACCESS_TOKEN')
"""


def get_devices():
    particle_api_url = 'https://api.particle.io/v1/devices'
    
    # Make the HTTP request to Particle API
    response = requests.get(particle_api_url, params={'access_token': particle_access_token})
    
    if response.ok:
        # If the request was successful, return the JSON response, which should contain the list of devices, to the console.
        print("devices list: ")
        for device in (response.json()):
            print(device['name'])
    else:
        # If there was an error, return an error response
        print({'error': 'Failed to fetch devices'}), 500



# Define the main function that runs when we run this file using python listDevicesExample.py
if __name__ == '__main__':
    get_devices()
