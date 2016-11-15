var http = require('https');
var fs = require('fs');

// iojs is deprecated and won't be updated anymore
var envs = ['nodejs'/*, 'iojs'*/];

function update(env) {
  http.get('https://' + env + '.org/dist/index.json', function (response) {
    var file = fs.createWriteStream(env + '.json');
    response.pipe(file);
  }).on('error', function (error) {
    console.error(error.message);
  });
}

envs.forEach(update);
