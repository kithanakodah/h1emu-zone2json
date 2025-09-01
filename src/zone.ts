import DataSchema from "h1z1-dataschema";
const log = (string: string) => process.stdout.write(string);

const headerSchema = [
  { name: "signature", type: "uint32" },
  { name: "version", type: "uint32" },
  { name: "unknown", type: "uint32" },
  {
    name: "offsets",
    type: "schema",
    fields: [
      { name: "ecos", type: "uint32" },
      { name: "floras", type: "uint32" },
      { name: "invisibleWalls", type: "uint32" },
      { name: "objects", type: "uint32" },
      { name: "lights", type: "uint32" },
      { name: "unknowns", type: "uint32" },
      { name: "decals", type: "uint32" },
    ],
  },
  { name: "quadsPerTile", type: "uint32" },
  { name: "tileSize", type: "float" },
  { name: "tileHeight", type: "float" },
  { name: "vertsPerTile", type: "uint32" },
  { name: "tilesPerChunk", type: "uint32" },
  { name: "startX", type: "int32" },
  { name: "startY", type: "int32" },
  { name: "chunksX", type: "uint32" },
  { name: "chunksY", type: "uint32" },
];

const ecoSchema2016 = [
  { name: "index", type: "uint32" },
  {
    name: "texture",
    type: "schema",
    fields: [
      { name: "name", type: "nullstring" },
      { name: "colorNxMap", type: "nullstring" },
      { name: "specBlendNyMap", type: "nullstring" },
      { name: "detailRepeat", type: "uint32" },
      { name: "blendStrength", type: "float" },
      { name: "specMin", type: "float" },
      { name: "specMax", type: "float" },
      { name: "specSmoothnessMin", type: "float" },
      { name: "specSmoothnessMax", type: "float" },
      { name: "physicsMaterial", type: "nullstring" },
    ],
  },
  {
    name: "layers",
    type: "array",
    fields: [
      { name: "density", type: "float" },
      { name: "minScale", type: "float" },
      { name: "maxScale", type: "float" },
      { name: "slopePeak", type: "float" },
      { name: "slopeExtent", type: "float" },
      { name: "minElevation", type: "float" },
      { name: "maxElevation", type: "float" },
      { name: "minAlpha", type: "uint8" },
      { name: "maxAlpha", type: "uint8" },
      { name: "flora", type: "nullstring" },
      {
        name: "tints",
        type: "array",
        fields: [
          { name: "color", type: "rgba" },
          { name: "percentage", type: "uint32" },
        ],
      },
    ],
  },
];

const objectSchema2016 = [
  { name: "actorDefinition", type: "nullstring" },
  { name: "renderDistance", type: "float" },
  {
    name: "instances",
    type: "array",
    fields: [
      { name: "position", type: "floatvector4" }, // translation
      { name: "rotation", type: "floatvector4" },
      { name: "scale", type: "floatvector4" },
      { name: "id", type: "uint32" },
      { name: "unknownByte1", type: "uint8" },
      { name: "unknownFloat1", type: "float" },
      { name: "unkData1", type: "uint64string" }, // below is unknownData[20]
      { name: "unkData1", type: "uint64string" }, // below is unknownData[20]
      { name: "unknownFloat2", type: "float" }, // below is unknownData[20]
    ],
  },
];

const objectSchema2018 = [
  { name: "actorDefinition", type: "nullstring" },
  { name: "renderDistance", type: "float" },
  {
    name: "instances",
    type: "array",
    fields: [
      { name: "position", type: "floatvector4" }, // translation
      { name: "rotation", type: "floatvector4" },
      { name: "scale", type: "floatvector4" },
      { name: "id", type: "uint32" },
      { name: "unknownFloat1", type: "float" }, // unknownData[5]
      { name: "unknownByte12", type: "uint8" }, // unknownData[5]
      {
        name: "uintPairs",
        type: "array",
        fields: [
          { name: "key", type: "uint32" },
          { name: "value", type: "uint32" },
        ],
      },
      {
        name: "floatPairs",
        type: "array",
        fields: [
          { name: "key", type: "uint32" },
          { name: "value", type: "float" },
        ],
      },
      { name: "unkDword1", type: "uint32" },
      {
        name: "vectorPairs",
        type: "array",
        fields: [
          { name: "key", type: "uint32" },
          { name: "value", type: "floatvector4" },
        ],
      },
      { name: "unkData3", type: "uint32" },
      { name: "unknownData4", type: "uint8" }, // unknownData[5]
    ],
  },
];

const ecoSchema = [
  { name: "index", type: "uint32" },
  { name: "name", type: "nullstring" },
  { name: "colorNxMap", type: "nullstring" },
  { name: "specBlendNyMap", type: "nullstring" },
  { name: "detailRepeat", type: "uint32" },
  { name: "blendStrength", type: "float" },
  { name: "specMin", type: "float" },
  { name: "specMax", type: "float" },
  { name: "specSmoothnessMin", type: "float" },
  { name: "specSmoothnessMax", type: "float" },
  { name: "physicsMaterial", type: "nullstring" },
  {
    name: "layers",
    type: "array",
    fields: [
      { name: "density", type: "float" },
      { name: "minScale", type: "float" },
      { name: "maxScale", type: "float" },
      { name: "slopePeak", type: "float" },
      { name: "slopeExtent", type: "float" },
      { name: "minElevation", type: "float" },
      { name: "maxElevation", type: "float" },
      { name: "minAlpha", type: "uint8" },
      { name: "flora", type: "nullstring" },
      {
        name: "tints",
        type: "array",
        fields: [
          { name: "color", type: "rgba" },
          { name: "percentage", type: "uint32" },
        ],
      },
    ],
  },
];

const floraSchema = [
  { name: "name", type: "nullstring" },
  { name: "texture", type: "nullstring" },
  { name: "model", type: "nullstring" },
  { name: "unknownBoolean1", type: "boolean" },
  { name: "unknownFloat1", type: "float" },
  { name: "unknownFloat2", type: "float" },
  { name: "unknownFloat3", type: "float" },
  { name: "unknownFloat4", type: "float" },
  { name: "unknownFloat5", type: "float" },
];

const floraSchemaPS2 = [
  { name: "name", type: "nullstring" },
  { name: "texture", type: "nullstring" },
  { name: "model", type: "nullstring" },
  { name: "unknownBoolean1", type: "boolean" },
  { name: "unknownFloat1", type: "float" },
  { name: "unknownFloat2", type: "float" },
];

const invisibleWallSchema = [
  { name: "unknownUint32", type: "uint32" },
  { name: "unknownFloat1", type: "float" },
  { name: "unknownFloat2", type: "float" },
  { name: "unknownFloat3", type: "float" },
];

const objectSchema = [
  { name: "actorDefinition", type: "nullstring" },
  { name: "renderDistance", type: "float" },
  {
    name: "instances",
    type: "array",
    fields: [
      { name: "position", type: "floatvector4" },
      { name: "rotation", type: "floatvector4" },
      { name: "scale", type: "floatvector4" },
      { name: "id", type: "uint32" },
      { name: "unknownByte1", type: "uint8" },
      { name: "unknownFloat1", type: "float" },
    ],
  },
];

const lightSchema = [
  { name: "name", type: "nullstring" },
  { name: "colorName", type: "nullstring" },
  { name: "type", type: "uint8" },
  { name: "unknownFloat1", type: "float" },
  { name: "position", type: "floatvector4" },
  { name: "rotation", type: "floatvector4" },
  { name: "range", type: "float" },
  { name: "innerRange", type: "float" },
  { name: "color", type: "argb" },
  { name: "unknownByte1", type: "uint8" },
  { name: "unknownByte2", type: "uint8" },
  { name: "unknownByte3", type: "uint8" },
  { name: "unknownByte4", type: "uint8" },
  { name: "unknownByte5", type: "uint8" },
  { name: "unknownVector1", type: "floatvector4" },
  { name: "unknownString1", type: "nullstring" },
  { name: "id", type: "uint32" },
];

const lightSchema2016 = [
  { name: "name", type: "nullstring" },
  { name: "color", type: "nullstring" },
  { name: "unk_data0", type: "uint64" }, // part 1 of byte[75]
  { name: "unk_data1", type: "uint64" }, // part 2 of byte[75]
  { name: "unk_data2", type: "uint64" }, // part 3 of byte[75]
  { name: "unk_data3", type: "uint64" }, // part 4 of byte[75]
  { name: "unk_data4", type: "uint64" }, // part 5 of byte[75]
  { name: "unk_data5", type: "uint64" }, // part 6 of byte[75]
  { name: "unk_data6", type: "uint64" }, // part 7 of byte[75]
  { name: "unk_data7", type: "uint64" }, // part 8 of byte[75]
  { name: "unk_data8", type: "uint64" }, // part 9 of byte[75]
  { name: "unk_data9", type: "uint16" }, // part 10 of byte[75]
  { name: "unk_data10", type: "uint8" }, // part 11 of byte[75]
];

const decalSchema2016 = [
  { name: "unk_int0", type: "uint32" },
  { name: "position", type: "floatvector4" }, // translation
  { name: "unk_int1", type: "uint32" },
  { name: "unk_int2", type: "uint32" },
  { name: "unk_int3", type: "uint32" },
  { name: "unk_int4", type: "uint32" },
  { name: "unk_int5", type: "uint32" },
  { name: "name", type: "nullstring" },
  { name: "unk_float0", type: "floatvector4" },
];

const decalSchema = [
  { name: "unknownFloat1", type: "float" },
  { name: "position", type: "floatvector4" },
  { name: "unknownFloat2", type: "float" },
  { name: "unknownFloat3", type: "float" },
  { name: "unknownFloat4", type: "float" },
  { name: "unknownFloat5", type: "float" },
  { name: "decimalDigits6And4", type: "uint32" }, //I mean, uh, the last 4 digits in decimal seem to be similar or same for several values, thus probably have some significance
  { name: "name", type: "nullstring" },
  { name: "unknownFloat6", type: "float" },
  { name: "unknownFloat7", type: "float" },
  { name: "unknownFloat8", type: "float" },
  { name: "unknownInt", type: "uint32" },
];

const schemaZone1 = [
  { name: "signature", type: "uint32" },
  { name: "version", type: "uint32" },
  {
    name: "offsets",
    type: "schema",
    fields: [
      { name: "ecos", type: "uint32" },
      { name: "floras", type: "uint32" },
      { name: "invisibleWalls", type: "uint32" },
      { name: "objects", type: "uint32" },
      { name: "lights", type: "uint32" },
      { name: "unknowns", type: "uint32" },
    ],
  },
  { name: "quadsPerTile", type: "uint32" },
  { name: "tileSize", type: "float" },
  { name: "tileHeight", type: "float" },
  { name: "vertsPerTile", type: "uint32" },
  { name: "tilesPerChunk", type: "uint32" },
  { name: "startX", type: "int32" },
  { name: "startY", type: "int32" },
  { name: "chunksX", type: "uint32" },
  { name: "chunksY", type: "uint32" },
  { name: "ecos", type: "array", fields: ecoSchema },
  { name: "floras", type: "array", fields: floraSchemaPS2 },
  { name: "invisibleWalls", type: "array", fields: invisibleWallSchema },
  { name: "objects", type: "array", fields: objectSchema },
  { name: "lights", type: "array", fields: lightSchema },
  { name: "unknowns", type: "array", fields: [] },
];

const schemaZone3 = [
  { name: "header", type: "schema", fields: headerSchema },
  { name: "ecos", type: "array", fields: ecoSchema },
  { name: "floras", type: "array", fields: floraSchema },
  { name: "invisibleWalls", type: "array", fields: invisibleWallSchema },
  { name: "objects", type: "array", fields: objectSchema },
  { name: "lights", type: "array", fields: lightSchema },
  { name: "unknowns", type: "array", fields: [] },
  { name: "decals", type: "array", fields: decalSchema },
];

const schemaZone4 = [
  { name: "header", type: "schema", fields: headerSchema },
  { name: "ecos", type: "array", fields: ecoSchema2016 },
  { name: "floras", type: "array", fields: floraSchema },
  { name: "invis_walls", type: "array", fields: [] },
  { name: "objects", type: "array", fields: objectSchema2016 },
  { name: "lights", type: "array", fields: lightSchema2016 },
  { name: "unk_int0", type: "uint32" },
  { name: "decals", type: "array", fields: decalSchema2016 },
];

const schemaZone5 = [
  { name: "header", type: "schema", fields: headerSchema },
  { name: "ecos", type: "array", fields: ecoSchema2016 },
  { name: "floras", type: "array", fields: floraSchema },
  { name: "invis_walls", type: "array", fields: [] },
  { name: "objects", type: "array", fields: objectSchema2018 },
  { name: "lights", type: "array", fields: lightSchema2016 },
  { name: "unk_int0", type: "uint32" },
  { name: "decals", type: "array", fields: decalSchema2016 },
];

function readZone(data: Buffer, offset: number) {
  offset = offset || 0;

  const signature = data.readUInt32LE(offset);
  if (signature != 0x454e4f5a) {
    throw "Not a valid zone file";
  }

  const version = data.readUInt32LE(offset + 4);
  let zone: any;
  switch (version) {
    case 0x00000001: //PS2
      zone = DataSchema.parse(schemaZone1, data, offset);
      break;
    case 0x00000003: //2015 H1Z1
      zone = DataSchema.parse(schemaZone3, data, offset);
      break;
    case 0x00000004: //2016 H1Z1
      zone = DataSchema.parse(schemaZone4, data, offset);
      break;
    case 0x00000005: //2018 H1Z1
      zone = DataSchema.parse(schemaZone5, data, offset);
      break;
    default:
      log(`Unsupported zone version: ${version}\n`);
      break;
  }
  log(`Zone version: ${version}\n`);
  return zone.result;
}

function writeZone(zone: any) {
  const version = zone.version ?? zone.header.version;

  if (version < 4) {
    // calculate new offsets
    let offset = 68,
      i;

    const offsets = zone.offsets ?? zone.header.offsets;

    offsets.ecos = offset;

    offset += 4;
    for (i = 0; i < zone.ecos.length; i++) {
      offset += DataSchema.calculateDataLength(ecoSchema, zone.ecos[i]);
    }
    offsets.floras = offset;

    offset += 4;
    for (i = 0; i < zone.floras.length; i++) {
      offset += DataSchema.calculateDataLength(floraSchema, zone.floras[i]);
    }
    offsets.invisibleWalls = offset;

    offset += 4;
    for (i = 0; i < (zone.invisibleWalls ?? zone.invis_walls).length; i++) {
      offset += DataSchema.calculateDataLength(
        invisibleWallSchema,
        zone.invisibleWalls[i],
      );
    }
    offsets.objects = offset;

    offset += 4;
    for (i = 0; i < zone.objects.length; i++) {
      offset += DataSchema.calculateDataLength(objectSchema, zone.objects[i]);
    }
    offsets.lights = offset;

    offset += 4;
    for (i = 0; i < zone.lights.length; i++) {
      offset += DataSchema.calculateDataLength(lightSchema, zone.lights[i]);
    }
    offsets.unknowns = offset;
  } else {
    // calculate new offsets
    let offset = 68,
      i;

    const offsets = zone.offsets ?? zone.header.offsets;

    offsets.ecos = offset;

    offset += 4;
    for (i = 0; i < zone.ecos.length; i++) {
      offset += DataSchema.calculateDataLength(ecoSchema2016, zone.ecos[i]);
    }
    offsets.floras = offset;

    offset += 4;
    for (i = 0; i < zone.floras.length; i++) {
      offset += DataSchema.calculateDataLength(floraSchema, zone.floras[i]);
    }
    offsets.invisibleWalls = offset;

    offset += 4;
    for (i = 0; i < (zone.invisibleWalls ?? zone.invis_walls).length; i++) {
      offset += DataSchema.calculateDataLength(
        invisibleWallSchema,
        zone.invisibleWalls[i],
      );
    }
    offsets.objects = offset;

    offset += 4;
    for (i = 0; i < zone.objects.length; i++) {
      offset += DataSchema.calculateDataLength(
        objectSchema2016,
        zone.objects[i],
      );
    }
    offsets.lights = offset;

    offset += 4;
    for (i = 0; i < zone.lights.length; i++) {
      offset += DataSchema.calculateDataLength(lightSchema2016, zone.lights[i]);
    }
    offsets.unknowns = offset;
  }

  let result: any;
  // write data
  switch (version) {
    case 0x00000001: //PS2
      result = DataSchema.pack(schemaZone1, zone, undefined, undefined);
      break;
    case 0x00000003: //2015 H1Z1
      result = DataSchema.pack(schemaZone3, zone, undefined, undefined);
      break;
    case 0x00000004: //2016 H1Z1
      result = DataSchema.pack(schemaZone4, zone, undefined, undefined);
      break;
    default:
      log(`Unsupported zone version: ${version}\n`);
      break;
  }
  log(`Zone version: ${version}\n`);
  return result.data;
}
export { readZone };
export { writeZone };
