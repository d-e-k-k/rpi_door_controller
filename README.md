# Rpi Door Controller

## IN DEVELOPMENT

## Overview
This project is a door alarm camera system. For the project a reed switch, a magnetic switch found in home alarm systems, is mounted on a door. When the door opens it opens the switch signaling a gpio pin on a Raspberry Pi. This signal triggers the Raspberry Pi to video record. Once the recording is completed it is convert from H2642 format to mp4 and sent to the backend along with meta data. The backend handles the data and sends the video to an aws S3 bucket and the corresponding timestamp and video url to a mongo db database hosted on mongo db atlas. A frontend will then access this data in a user friendly interface. Users will be able to access recordings by date.

## Current Status
The core backend functionality and controller functionality have been built. Separating a reed switch will result in a video being stored in aws as well and corresponding data in a mongodb. 


## Original Layout Ideas
![Original Hardware Layout](https://user-images.githubusercontent.com/71715721/106809303-824a2b80-6639-11eb-99e5-4de72d66a5ae.png)

## Original Rough Work Flow
![Flow Chart](https://user-images.githubusercontent.com/71715721/106810528-149eff00-663b-11eb-88fc-f505e6f93ded.png)

## Hardware
- Raspberry Pi *(any model)*
- Rpi Camera
- Reed Switch NO*
- 1x 1K Resistor 
- 1x 10K Resisitor
- Bread Board
- Male to Male and Female to Male Jumpers

 **I am using a normally open ("NO") reed switch. When the magnet is near the switch as it is when the door is closed, the circuit is also closed. When the door opens the circuit also opens. The switch is being monitored for as an input by the raspberry pi that fires when it sees a falling current. Like the release of a pressed button or in our case a door opening and the magnet moving away from the reed switch. If you had a normally closed switch you would want to change the 'falling' to 'rising' when defining the reedSwitch*

```js
const reedSwitch = new Gpio(17, 'in', 'falling', { debounceTimeout: 500 });
reedSwitch.watch((err, value) => {
        if (!value) {....Record video, convert, then send off data...}

```

## Dependencies
- [handbrakes-js](https://www.npmjs.com/package/handbrake-js)
- [onoff](https://www.npmjs.com/package/onoff)
- [pi-camera](https://www.npmjs.com/package/pi-camera)
