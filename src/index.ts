#!/usr/bin/env node

import fs from 'fs';
import copyfiles = require('copyfiles');


const pack = process.argv[2];
const destination = process.argv[3];
if (!pack || pack.length == 0 || !destination || destination.length == 0) {
    console.error('Usage: npx copy-package-files <package> <destination>');
    console.error('No folder specified.');
    process.exit(1);
}

const exists = fs.existsSync(pack) && fs.existsSync(destination);
if (!exists) {
    console.error('Usage: npx copy-package-files <package> <destination>');
    console.error('Not found.');
    process.exit(1);
}

const packjson = JSON.parse(fs.readFileSync(pack, { encoding: 'utf-8' }));
const files = packjson.files as string[];

if(!files || files.length == 0) {
    console.log('!!!!!!!!!!! No files found !!!!!!!!!!! ');
    // exit with 0 in case this was intentional.
    process.exit(0);
}

copyfiles([...files, destination], () => {
    console.log('Copied all files!');
    process.exit(0);
});
