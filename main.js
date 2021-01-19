const http = require('http');
const utils = require('./utils');

// Parameters
const port = require('yargs').argv.port ? port : 8888;
const bodyToFile = require('yargs').argv.bodyToFile == true;

if (bodyToFile) console.info("Flag bodyToFile set to true")

const server = http.createServer((request, response) => {
  const requestStart = Date.now();

  let errorMessage = null;
  let body = [];
  request.on("data", chunk => {
    body.push(chunk);
  });
  request.on("end", () => {
    body = Buffer.concat(body);
    body = body.toString();
  });
  request.on("error", error => {
    errorMessage = error.message;
  });

  response.on("finish", () => {
    const { rawHeaders, httpVersion, method, socket, url } = request;
    const { remoteAddress, remoteFamily } = socket;
    const timestamp = Date.now();

    console.log(
      {
        timestamp: timestamp,
        processingTime: timestamp - requestStart,
        rawHeaders,
        body,
        errorMessage,
        httpVersion,
        method,
        remoteAddress,
        remoteFamily,
        url
      }
    );

    if (bodyToFile) {
      utils.saveFile(`${timestamp}.log`, body);
    }

  });

  process(request, response);
});

const process = (request, response) => {
  setTimeout(() => {
    response.end();
  }, 100);
};


console.log('Starting MockServer on ', 'localhost', ' and port ', port)
server.listen(port);
