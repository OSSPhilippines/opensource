const fs = require('fs');

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Generate the README.md content
const readmeContent = `# ${packageJson.name}\n\n${packageJson.description}\n\n## Author\n\n${packageJson.author}\n\n## License\n\n${packageJson.license}`;

// Write the README.md file
fs.writeFileSync('README.md', readmeContent);
