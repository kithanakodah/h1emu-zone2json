import { writeZone } from "h1emu-zone2json";
import fs from "fs";

const jsonFile = process.argv[2]; // Get filename from command line  
const outputFile = process.argv[3] || jsonFile.replace('.json', '.zone');

const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
const binaryZone = writeZone(jsonData);
fs.writeFileSync(outputFile, binaryZone);
console.log(`Converted ${jsonFile} to ${outputFile}`);