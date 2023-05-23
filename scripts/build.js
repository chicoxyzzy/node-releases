const http = require('https');
const fs = require('fs/promises');
const path = require('path');
const semver = require('semver');

function loadJSON (url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      })
      response.on('end', () => {
        resolve(JSON.parse(data));
      })
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function writeJSON(file, data) {
  await fs.writeFile(path.join(__dirname, '..', file), JSON.stringify(data));
}

async function processVersions() {
  const origin = await loadJSON('https://nodejs.org/dist/index.json');
  const processed = origin
    .filter(function (env) {
      return semver.patch(env.version) === 0;
    })
    .map(function (env) {
      return {
        name: 'nodejs',
        version: env.version.substr(1),
        date: env.date,
        lts: env.lts,
        security: env.security,
        v8: env.v8
      };
    })
    .sort((a, b) => {
      if (semver.gt(a.version, b.version)) return 1;
      if (semver.lt(a.version, b.version)) return -1;
      return 0;
    });
  await writeJSON('data/processed/envs.json', processed);
}

async function processSchedule() {
  const origin = await loadJSON(
    'https://raw.githubusercontent.com/nodejs/Release/master/schedule.json'
  );
  await writeJSON('data/release-schedule/release-schedule.json', origin);
}

processVersions();
processSchedule();
