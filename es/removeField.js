var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var without = function without(object, key) {
  var copy = _extends({}, object);
  delete copy[key];
  return copy;
};

var removeField = function removeField(fields, path) {
  var dotIndex = path.indexOf('.');
  var openIndex = path.indexOf('[');
  var closeIndex = path.indexOf(']');
  if (openIndex > 0 && closeIndex !== openIndex + 1) {
    throw new Error('found [ not followed by ]');
  }
  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
    // array field
    var key = path.substring(0, openIndex);
    if (!Array.isArray(fields[key])) {
      return without(fields, key);
    }
    var rest = path.substring(closeIndex + 1);
    if (rest[0] === '.') {
      rest = rest.substring(1);
    }
    if (rest) {
      var copy = [];
      fields[key].forEach(function (item, index) {
        var result = removeField(item, rest);
        if (Object.keys(result).length) {
          copy[index] = result;
        }
      });
      return copy.length ? _extends({}, fields, _defineProperty({}, key, copy)) : without(fields, key);
    }
    return without(fields, key);
  }
  if (dotIndex > 0) {
    // subobject field
    var _key = path.substring(0, dotIndex);
    var _rest = path.substring(dotIndex + 1);
    if (!fields[_key]) {
      return fields;
    }
    var result = removeField(fields[_key], _rest);
    return Object.keys(result).length ? _extends({}, fields, _defineProperty({}, _key, removeField(fields[_key], _rest))) : without(fields, _key);
  }
  return without(fields, path);
};

export default removeField;