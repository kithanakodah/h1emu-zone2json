import { readZone } from "h1emu-zone2json";
import fs from "fs";

const zoneFile = process.argv[2]; // Get filename from command line
const outputFile = process.argv[3] || zoneFile.replace('.zone', '.json');

const zoneData = fs.readFileSync(zoneFile);
const jsonData = readZone(zoneData, 0);
fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
console.log(`Converted ${zoneFile} to ${outputFile}`);