const fs = require("fs");
const properties = require("../data/properties.json");

const attributes = Object.values(properties).reduce(
  (acc, cur) => ({
    ...acc,
    [cur.attributeName]: cur.propertyName
  }),
  {}
);

fs.writeFileSync(
  "../data/attributes.json",
  JSON.stringify(attributes, undefined, 2)
);
