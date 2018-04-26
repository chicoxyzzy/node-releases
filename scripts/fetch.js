var http = require('https');
var fs = require('fs');
var path = require('path');

// iojs is deprecated and won't be updated anymore
var envs = ['nodejs'/*, 'iojs'*/];

envs.forEach(function (env) {
  loadData({
    srcUrl: 'https://' + env + '.org/dist/index.json',
    dstPath: path.resolve(__dirname, '../data/raw', env + '.json')
  })
});
loadData({
  srcUrl: 'https://raw.githubusercontent.com/nodejs/Release/master/schedule.json',
  dstPath: path.resolve(__dirname, '../data/release-schedule/release-schedule.json')
});

function loadData (params) {
  http.get(params.srcUrl, function (response) {
    var file = fs.createWriteStream(params.dstPath);
    response.pipe(file);
  }).on('error', function (error) {
    console.error(error.message);
  });
}
