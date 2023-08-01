'use strict';

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your project name? ', (name) => {
  rl.question('What is your project description? ', (description) => {
    rl.question('What is your project license? ', (license) => {
      rl.question('What is the author name for package.json? ', (authorName) => {
        fs.mkdirSync(name);

        const packageJsonContent = {
          name,
          description,
          license,
          author: authorName
        };

        fs.writeFileSync(`${name}/package.json`, JSON.stringify(packageJsonContent, null, 2));
        fs.writeFileSync(`${name}/LICENSE`, license);

        // Read the package.json file
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

        // Generate the README.md content
        const readmeContent = `# Open Source Project Generator\n\n${packageJson.description}\n\n## Author\n\n${packageJson.author}\n\n## License\n\n${packageJson.license}`;

        // Write the README.md file
        fs.writeFileSync('README.md', readmeContent);

        fs.writeFileSync(`${name}/CONTRIBUTING.md`, `# Contributing to ${name}\n\n`);
        fs.writeFileSync(`${name}/CODE_OF_CONDUCT.md`, `# Code of Conduct\n\n`);

        rl.close();
      });
    });
  });
});
