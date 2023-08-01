const fs = require('fs');
const readline = require('readline');
const { program } = require('commander');
const path = require('path');
const TIMEOUT = Math.floor(Math.random() * 2000) + 1000;

const licenses = [
  'Apache-2.0',
  'BSD-3-Clause',
  'GPL-3.0',
  'ISC',
  'MIT',
];

program
  .version('1.0.0')
  .description('🚀 Open Source Project Generator')
  .arguments('<projectName>')
  .action(async (projectName) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    try {
      const description = await promptQuestion(rl, '📝 What is your project description? ');
      const selectedLicense = await promptQuestion(rl, `📜 Choose a license for your project (${licenses.join(', ')}): `);

      if (!licenses.includes(selectedLicense)) {
        console.error('❌ Invalid license selection. Please choose from the provided options.');
        rl.close();
        return;
      }

      const authorName = await promptQuestion(rl, '👤 What is the author name? ');
      const authorEmail = await promptQuestion(rl, '📧 What is the author email? ');

      // Add a fake loading effect
      console.log('🔧 Generating project files...');
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT)); // Fake loading for 2 seconds

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

      // Create the LICENSE file using the selected license template
      const licenseTemplatePath = path.join(__dirname, 'templates', 'licenses', `${selectedLicense}_LICENSE.md`);
      const licenseTemplate = fs.readFileSync(licenseTemplatePath, 'utf8');

      fs.writeFileSync(`${projectName}/LICENSE`, licenseTemplate);
      fs.writeFileSync(`${projectName}/package.json`, JSON.stringify(packageJsonContent, null, 2));

      // Use path to construct the template file paths
      const templateDir = path.join(__dirname, 'templates');
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

      // Fake loading complete. Show success message.
      console.log('✅ Project files generated successfully!');
    } catch (error) {
      console.error('❌ An error occurred:', error.message);
    } finally {
      rl.close();
    }
  });

program.parse(process.argv);

function promptQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}
