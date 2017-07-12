var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import isPristine from './isPristine';
import isValid from './isValid';
import isChecked from './isChecked';

/**
 * Updates a field object from the store values
 */
var updateField = function updateField(field, formField, active, syncError) {
  var diff = {};
  var formFieldValue = formField.value === undefined ? '' : formField.value;

  // update field value
  if (field.value !== formFieldValue) {
    diff.value = formFieldValue;
    diff.checked = isChecked(formFieldValue);
  }

  // update dirty/pristine
  var pristine = isPristine(formFieldValue, formField.initial);
  if (field.pristine !== pristine) {
    diff.dirty = !pristine;
    diff.pristine = pristine;
  }

  // update field error
  var error = syncError || formField.submitError || formField.asyncError;
  if (error !== field.error) {
    diff.error = error;
  }
  var valid = isValid(error);
  if (field.valid !== valid) {
    diff.invalid = !valid;
    diff.valid = valid;
  }

  if (active !== field.active) {
    diff.active = active;
  }
  var touched = !!formField.touched;
  if (touched !== field.touched) {
    diff.touched = touched;
  }
  var visited = !!formField.visited;
  if (visited !== field.visited) {
    diff.visited = visited;
  }
  var autofilled = !!formField.autofilled;
  if (autofilled !== field.autofilled) {
    diff.autofilled = autofilled;
  }

  if ('initial' in formField && formField.initial !== field.initialValue) {
    field.initialValue = formField.initial;
  }

  return Object.keys(diff).length ? _extends({}, field, diff) : field;
};
export default updateField;