# Rpi Door Controller

## IN DEVELOPMENT

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
