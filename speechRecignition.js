/**
 * Created by setve on 05/01/2017.
 */
'use strict';

const Speech = require('@google-cloud/speech');

const fs = require('fs');

function streamingRecognize (filename, callback) {
    // Instantiates a client
    const speech = Speech();

    const options = {
        config: {
            // Configure these settings based on the audio you're transcribing
            encoding: 'LINEAR16',
            sampleRate: 16000
        }
    };

    // Create a recognize stream
    const recognizeStream = speech.createRecognizeStream(options)
            .on('error', callback)
            .on('data', (data) => {
            console.log('Data received: %j', data);
    callback();
});

    // Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
    fs.createReadStream(filename).pipe(recognizeStream);
}
// [END speech_streaming_recognize]