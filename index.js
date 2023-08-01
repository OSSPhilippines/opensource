const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
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
        fs.mkdirSync(name);

        const packageJsonContent = {
          name,
          description,
          license: selectedLicense,
          author: authorName
        };

        fs.writeFileSync(`${name}/package.json`, JSON.stringify(packageJsonContent, null, 2));
        fs.writeFileSync(`${name}/LICENSE`, selectedLicense);

        // Read the package.json file from the project directory
        const packageJson = JSON.parse(fs.readFileSync(`${name}/package.json`, 'utf8'));

        // Generate the README.md content
        const readmeContent = `# Open Source Project Generator\n\n${packageJson.description}\n\n## Author\n\n${packageJson.author}\n\n## License\n\n${packageJson.license}`;

        // Write the README.md file
        fs.writeFileSync(`${name}/README.md`, readmeContent);

        fs.writeFileSync(`${name}/CONTRIBUTING.md`, `# Contributing to ${name}\n\n`);
        fs.writeFileSync(`${name}/CODE_OF_CONDUCT.md`, `# Code of Conduct\n\n`);

        rl.close();
      });
    });
  });
});
