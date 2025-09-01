# h1emu-zone2json

Based on https://github.com/psemu/forgelight-zone

Read and write .zone files for H1emu

# Installing

`npm install h1emu-zone2json`

# Usage

```js
import { readZone, writeZone } from "h1emu-zone2json";
import fs from "fs";
const z1_json = readZone(fs.readFileSync("./Z1.zone"), 0);
fs.writeFileSync("./myzone.zone", JSON.stringify(writeZone(z1_json)));
```
