import styleParser from "style-to-object";
import attributesMap from "./attributes.json";
import booleans from "./booleans.json";

function attributesToProps(attributes) {
  const props = {};

  Object.keys(attributes).forEach(function(attribute) {
    const value = attributes[attribute];

    const propertyName = attributesMap[attribute.toLowerCase()];

    if (propertyName) {
      if (booleans.indexOf(propertyName) > -1) {
        if (value === "false") {
          props[propertyName] = false;
        } else {
          props[propertyName] = true;
        }
      } else {
        props[propertyName] = value;
      }
    } else if (attribute.toLowerCase() === "style") {
      props["style"] = styleParser(value);
    } else {
      props[attribute] = value;
    }
  });

  return props;
}

export default attributesToProps;
