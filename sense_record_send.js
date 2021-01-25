const PiCamera = require('pi-camera');
const hbjs = require('handbrake-js');

const fileName = new Date.now()

const myCamera = new PiCamera({
	mode: 'video',
	output: `${__dirname}/${fileName}.h264`,
	width: 1920,
	height: 1080,
	timeout: 5000, // Record for 5 seconds
	nopreview: true,
});

myCamera
	.record()
	.then((result) => {
		console.log('Recording Complete');
		hbjs
			.spawn({ input: `${fileName}.h264`, output: `${fileName}.mp4` })
			.on('error', (err) => {
				// invalid user input, no video found etc
			})
			.on('progress', (progress) => {
				console.log(
					'Percent complete: %s, ETA: %s',
					progress.percentComplete,
					progress.eta
				);
			});
	})
	.catch((error) => {
		console.log(error);
	});
