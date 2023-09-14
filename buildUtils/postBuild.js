const fs = require('fs');
const path = require('path');

const filename = 'plugin.bundle.js';
const filePath = path.join(__dirname, '..', 'dist', filename);

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file ${filePath}: ${err}`);
    return;
  }

  // Split the content into lines
  const modifiedString = data.substring(5, data.length - 4);

  // Write the modified content back to the file
  fs.writeFile(filePath, modifiedString, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file ${filePath}: ${err}`);
      return;
    }

    console.log(`File ${filePath} has been modified and saved.`);
  });
});
