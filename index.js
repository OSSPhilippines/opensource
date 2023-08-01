const fs = require('fs');
const readline = require('readline');
const { program } = require('commander');

const licenses = [
  'MIT',
  'Apache-2.0',
  'GPL-3.0',
  'ISC',
  'BSD-3-Clause',
  'Unlicense'
];

program
  .version('1.0.0')
  .description('Open Source Project Generator')
  .arguments('<projectName>')
  .action((projectName) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('What is your project description? ', (description) => {
      rl.question(`Choose a license for your project (${licenses.join(', ')}): `, (selectedLicense) => {
        if (!licenses.includes(selectedLicense)) {
          console.error('Invalid license selection. Please choose from the provided options.');
          rl.close();
          return;
        }

        rl.question('What is the author name for package.json? ', (authorName) => {
          fs.mkdirSync(projectName);

          const packageJsonContent = {
            name: projectName,
            description,
            license: selectedLicense,
            author: authorName
          };

          fs.writeFileSync(`${projectName}/package.json`, JSON.stringify(packageJsonContent, null, 2));
          fs.writeFileSync(`${projectName}/LICENSE`, selectedLicense);

          // Read the package.json file from the project directory
          const packageJson = JSON.parse(fs.readFileSync(`${projectName}/package.json`, 'utf8'));

          // Generate the README.md content
          const readmeContent = `# Open Source Project Generator\n\n${packageJson.description}\n\n## Author\n\n${packageJson.author}\n\n## License\n\n${packageJson.license}`;

          // Write the README.md file
          fs.writeFileSync(`${projectName}/README.md`, readmeContent);

          fs.writeFileSync(`${projectName}/CONTRIBUTING.md`, `# Contributing to ${projectName}\n\n`);
          fs.writeFileSync(`${projectName}/CODE_OF_CONDUCT.md`, `# Code of Conduct\n\n`);

          rl.close();
        });
      });
    });
  });

program.parse(process.argv);
