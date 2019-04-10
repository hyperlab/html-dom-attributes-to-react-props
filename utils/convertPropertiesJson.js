const fs = require("fs");
const path = require("path");
const properties = require("./properties.json");

const attributes = Object.values(properties).reduce(
  (acc, { attributeName, propertyName }) => {
    if (attributeName === propertyName) {
      return acc;
    } else {
      return {
        ...acc,
        [attributeName]: propertyName
      };
    }
  },
  {}
);

fs.writeFileSync(
  path.resolve(__dirname, "../src/attributes.json"),
  JSON.stringify(attributes, undefined, 2)
);

const booleans = Object.values(properties)
  .filter(property => property.acceptsBooleans)
  .map(property => property.propertyName);

fs.writeFileSync(
  path.resolve(__dirname, "../src/booleans.json"),
  JSON.stringify(booleans, undefined, 2)
);
