const fs = require('fs');
const readline = require('readline');
const { program } = require('commander');
const path = require('path');

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

        rl.question('What is the author name? ', (authorName) => {
          rl.question('What is the author email? ', (authorEmail) => {
            fs.mkdirSync(projectName);

            const packageJsonContent = {
              name: projectName,
              description,
              license: selectedLicense,
              author: {
                name: authorName,
                email: authorEmail
              }
            };

            fs.writeFileSync(`${projectName}/LICENSE`, selectedLicense);
            fs.writeFileSync(`${projectName}/package.json`, JSON.stringify(packageJsonContent, null, 2));

            // Use path to construct the template file paths
            const templateDir = path.join(__dirname, 'template');
            const readmeTemplate = fs.readFileSync(path.join(templateDir, 'README.md'), 'utf8');
            const contributingTemplate = fs.readFileSync(path.join(templateDir, 'CONTRIBUTING.md'), 'utf8');
            const codeOfConductTemplate = fs.readFileSync(path.join(templateDir, 'CODE_OF_CONDUCT.md'), 'utf8');
            const changelogTemplate = fs.readFileSync(path.join(templateDir, 'CHANGELOG.md'), 'utf8');

            const readmeContent = readmeTemplate
              .replace('<DESCRIPTION>', description)
              .replace('<AUTHOR>', authorName)
              .replace('<LICENSE>', selectedLicense);

            const contributingContent = contributingTemplate
              .replace('<PROJECT_NAME>', projectName);

            const codeOfConductContent = codeOfConductTemplate
              .replace('<PROJECT_NAME>', projectName);

            const changelogContent = changelogTemplate
              .replace('<PROJECT_NAME>', projectName);

            // Write the modified template files
            fs.writeFileSync(`${projectName}/README.md`, readmeContent);
            fs.writeFileSync(`${projectName}/CONTRIBUTING.md`, contributingContent);
            fs.writeFileSync(`${projectName}/CODE_OF_CONDUCT.md`, codeOfConductContent);
            fs.writeFileSync(`${projectName}/CHANGELOG.md`, changelogContent);

            rl.close();
          });
        });
      });
    });
  });

program.parse(process.argv);
