const path = require('path');
const fs = require('fs');

const GENERATED_FILENAME = 'index.tsx';
const GENERATED_FILE_PATH = path.join(__dirname, `../src/api/${GENERATED_FILENAME}`);
const data = fs.readFileSync(GENERATED_FILE_PATH, { encoding: 'utf8' });
fs.writeFileSync(GENERATED_FILE_PATH, data.replace('\n', '\n// @ts-nocheck\n'), { encoding: 'utf8' });
console.log(`Generated api file ${GENERATED_FILE_PATH} fixed`)