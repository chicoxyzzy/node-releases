var fs = require('fs');
var path = require('path');

var pick = require('lodash.pick');
var semver = require('semver');

var processedData = fs.readdirSync(path.join(__dirname, '../data/raw')).reduce(function (result, file) {
  var envName = path.basename(file, '.json');
  var content = require(path.join(__dirname, '../data/raw', file));
  result[envName] = content
    .map(function (env) {
      return pick(env, ['version', 'date', 'lts']);
    })
    .sort(function (a, b) {
      if (semver.gt(a.version, b.version)) return 1;
      if (semver.lt(a.version, b.version)) return -1;
      return 0;
    });
  return result;
}, {});

fs.writeFileSync(path.join(__dirname, '../data/processed/envs.json'), JSON.stringify(processedData));
