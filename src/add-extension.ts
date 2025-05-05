import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.resolve();

// Define the path to dist/index.js
const filePath = path.join(currentDir, 'dist', 'index.js');

// Function to add ".js" extension to import statements
function addExtensionToImports(filePath: string): void {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Add ".js" extension to the import paths
    let updatedData = data.replace(
      /import\s+{[^}]+}\s+from\s+['"](\.\/[a-zA-Z0-9\-\/]+)['"];/g,
      (match, p1) => {
        // Add ".js" to the import path
        return match.replace(p1, `${p1}.js`);
      }
    );

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedData, 'utf-8', (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log('Imports updated in dist/index.js');
    });
  });
}

// Call the function to update imports
addExtensionToImports(filePath);
