const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your project name? ', (name) => {
  rl.question('What is your project description? ', (description) => {
    rl.question('What is your project license? ', (license) => {
      fs.mkdirSync(name);
      fs.writeFileSync(`${name}/package.json`, JSON.stringify({ name, description, license }, null, 2));
      fs.writeFileSync(`${name}/LICENSE`, license);
      rl.close();
    });
  });
});
