const fs = require('fs');
const path = require('path');
jest.mock('fs');

// Mock readline module
const readline = require('readline');
jest.mock('readline');

describe('index.js tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should write README.md with correct content', () => {
    // Mock readline.createInterface
    readline.createInterface.mockReturnValue({
      question: (question, callback) => {
        // Simulate user input for each question
        if (question === 'What is your project name? ') {
          callback('package name');
        } else if (question === 'What is your project description? ') {
          callback('package description');
        } else if (question === 'What is your project license? ') {
          callback('package license');
        } else if (question === 'What is the author name for package.json? ') {
          callback('package author');
        }
      },
      close: jest.fn(),
    });

    // Mock fs.readFileSync to return the packageJson content
    const packageJson = {
      name: 'package name',
      description: 'package description',
      author: 'package author',
      license: 'package license',
    };
    fs.readFileSync.mockReturnValue(JSON.stringify(packageJson));

    // Run the code that uses readline and fs
    require('./index.js');

    // Test that fs.writeFileSync was called with the correct content
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'README.md',
      `# ${packageJson.name}\n\n${packageJson.description}\n\n## Author\n\n${packageJson.author}\n\n## License\n\n${packageJson.license}`
    );
  });
});
