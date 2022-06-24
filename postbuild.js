const fs = require('fs');

fs.copyFileSync('./LICENSE', './dist/LICENSE');
fs.copyFileSync('./package.json', './dist/package.json');
fs.copyFileSync('./README.md', './dist/README.md');
