'use strict';

var fs = require('fs');
var readline = require('readline');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var readline__default = /*#__PURE__*/_interopDefaultLegacy(readline);

const rl = readline__default["default"].createInterface({
  input: process.stdin,
  output: process.stdout
});

const licenses = [
  'MIT',
  'Apache-2.0',
  'GPL-3.0',
  'ISC',
  'BSD-3-Clause',
  'Unlicense'
];

rl.question('What is your project name? ', (name) => {
  rl.question('What is your project description? ', (description) => {
    rl.question(`Choose a license for your project (${licenses.join(', ')}): `, (selectedLicense) => {
      if (!licenses.includes(selectedLicense)) {
        console.error('Invalid license selection. Please choose from the provided options.');
        rl.close();
        return;
      }

      rl.question('What is the author name for package.json? ', (authorName) => {
        fs__default["default"].mkdirSync(name);

        const packageJsonContent = {
          name,
          description,
          license: selectedLicense,
          author: authorName
        };

        fs__default["default"].writeFileSync(`${name}/package.json`, JSON.stringify(packageJsonContent, null, 2));
        fs__default["default"].writeFileSync(`${name}/LICENSE`, selectedLicense);

        // Read the package.json file from the project directory
        const packageJson = JSON.parse(fs__default["default"].readFileSync(`${name}/package.json`, 'utf8'));

        // Generate the README.md content
        const readmeContent = `# Open Source Project Generator\n\n${packageJson.description}\n\n## Author\n\n${packageJson.author}\n\n## License\n\n${packageJson.license}`;

        // Write the README.md file
        fs__default["default"].writeFileSync(`${name}/README.md`, readmeContent);

        fs__default["default"].writeFileSync(`${name}/CONTRIBUTING.md`, `# Contributing to ${name}\n\n`);
        fs__default["default"].writeFileSync(`${name}/CODE_OF_CONDUCT.md`, `# Code of Conduct\n\n`);

        rl.close();
      });
    });
  });
});

var opensource = {

};

module.exports = opensource;
