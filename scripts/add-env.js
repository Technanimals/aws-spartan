/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const index = path.resolve(__dirname, '../dist/index.js');
const data = fs.readFileSync(index).toString().split('\n');

data.splice(0, 0, '#!/usr/bin/env node');
const text = data.join('\n');

fs.writeFileSync(index, text);
