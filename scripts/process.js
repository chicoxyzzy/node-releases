var fs = require('fs');
var path = require('path');

var semver = require('semver');

var processedData = fs.readdirSync(path.join(__dirname, '../data/raw')).reduce(function (result, file) {
  var envName = path.basename(file, '.json');
  var content = require(path.join(__dirname, '../data/raw', file));
  return result.concat(content
    .filter(function (env) {
      return semver.patch(env.version) === 0;
    })
    .map(function (env) {
      return {
        name: envName,
        version: env.version.substr(1),
        date: env.date,
        lts: env.lts
      };
    }));
}, []).sort(function (a, b) {
  if (semver.gt(a.version, b.version)) return 1;
  if (semver.lt(a.version, b.version)) return -1;
  return 0;
});

fs.writeFileSync(path.join(__dirname, '../data/processed/envs.json'), JSON.stringify(processedData, null, 2));
