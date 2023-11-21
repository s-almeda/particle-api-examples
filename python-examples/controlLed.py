
"""ParticleAPI Python example code
Prepared by Shm Garanganao Almeda for DES INV202

ABOUT:
This super simple code looks for a function named 'led' and tries to turn it 'on' (or off, you can change it on line 20), then stops running. 
You can run this code by running python controlLed.py in your terminal.

NOTE: Make sure to change the access token to one that accesses YOUR Particle account!!
You can generate an access token on this page: https://docs.particle.io/reference/cloud-apis/access-tokens/ 
Just scroll down to where it says "Create a token (browser based)"
"""

import requests

def main():
    device_id = 'rabbit_snail' #replace this with YOUR device id! 
    access_token = '' #replace this with YOUR access token!
    arg = 'on'  # change this to 'off', and the code will turn the led off instead.


    try:
        result = control_led(device_id, arg, access_token)
        print('LED control response:', result)
    except requests.exceptions.RequestException as e:
        print('Error controlling LED:', e)


def control_led(device_id, arg, access_token):
    particle_api_url = f'https://api.particle.io/v1/devices/{device_id}/led'

    # Data to be sent in the POST request
    data = {
        'arg': arg,
        'access_token': access_token
    }

    # Make the HTTP request to control the LED
    response = requests.post(particle_api_url, data=data)

    if response.ok:
        # If the request was successful, return the JSON response
        return response.json()
    else:
        # If there was an error, raise an exception
        response.raise_for_status()

if __name__ == '__main__':
    main()