const Gpio = require('onoff').Gpio;
const PiCamera = require('pi-camera');
const hbjs = require('handbrake-js');
const reedSwitch = new Gpio(17, 'in', 'falling', { debounceTimeout: 500 });
const FormData = require('form-data');
const fs = require('fs');

reedSwitch.watch((err, value) => {
	if (err) {
		console.log(err);
	}
	//console.log(value);
	if (!value) {
		console.log('Door is open');
		const fileName = Date.now();

		const myCamera = new PiCamera({
			mode: 'video',
			output: `${__dirname}/${fileName}.h264`,
			width: 960,
			height: 540,
			timeout: 5000, // Record for 5 seconds
			nopreview: true,
		});

		myCamera
			.record()
			.then((res) => {
				console.log('Recording Complete');
				console.log('Conversion Started');
				hbjs.exec(
					{ input: `${fileName}.h264`, output: `${fileName}.mp4` },
					function (err, stdout, stderr) {
						console.log('Conversion Complete');
						console.log('Sending Data');
						if (err) {
							throw err;
							console.log(stdout);
						} else {
							const form = new FormData();
							form.append('videoUrl', fs.createReadStream(`./${fileName}.mp4`));

							form.submit('https://rpi-door-sensor.herokuapp.com/recordings', (err, res) => {
								if (err) {
									console.log(err);
								} else {
									res.resume();
								}
							});
						}
					}
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}
});

process.on('SIGINT', (_) => {
	reedSwitch.unexport();
});

