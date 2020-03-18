const schedule = require('./data/release-schedule/release-schedule.json');
const nodejs = require('./data/raw/nodejs.json');
const iojs = require('./data/raw/nodejs.json');

exports.schedule = schedule;
exports.nodejs = nodejs;
exports.iojs = iojs;
exports.allVersions = Object.assign(iojs, nodejs);
