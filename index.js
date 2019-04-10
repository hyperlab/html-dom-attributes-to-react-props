const attributesMap = require("./data/attributes.json");
const propertiesMap = require("./data/properties.json");
const styleParser = require("style-to-object");

/* From react-dom.development.js */
const ATTRIBUTE_NAME_START_CHAR =
  ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
const ATTRIBUTE_NAME_CHAR =
  ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
const VALID_ATTRIBUTE_NAME_REGEX = new RegExp(
  "^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"
);

function isValidAttributeName(name) {
  return VALID_ATTRIBUTE_NAME_REGEX.test(name);
}

function attributesToProps(attributes) {
  const props = {};

  Object.keys(attributes).forEach(attribute => {
    const value = attributes[attribute];

    const propertyName = attributesMap[attribute.toLowerCase()];
    const property = propertiesMap[propertyName];

    if (property) {
      if (propertyName === "style") {
        props[propertyName] = styleParser(value);
      } else if (property.hasBooleanValue) {
        props[propertyName] = true;
      } else {
        props[propertyName] = value;
      }
    } else if (isValidAttributeName(attribute)) {
      props[attribute] = value;
    }
  });

  return props;
}

module.exports = attributesToProps;
