const fs = require('fs');
const path = require('path');
jest.mock('fs');

describe('index.js tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should write README.md with correct content', () => {
    const packageJson = {
      name: 'package name',
      description: 'package description',
      author: 'package author',
      license: 'package license',
    };
    fs.readFileSync.mockReturnValue(JSON.stringify(packageJson));
    require('./index.js');
    expect(fs.writeFileSync).toHaveBeenCalledWith('README.md', `# ${packageJson.name}\n\n${packageJson.description}\n\n## Author\n\n${packageJson.author}\n\n## License\n\n${packageJson.license}`);
  });
});
const { sum, mul } = require('./index');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('multiplies 3 * 2 to equal 6', () => {
  expect(mul(3, 2)).toBe(6);
});
