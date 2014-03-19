define(function() {
  'use strict';
  /*
  Validate a todo
  */

  var validateTodo;
  return validateTodo = function(todo) {
    var result, valid;
    valid = todo && 'text' in todo && todo.text.trim();
    result = {
      valid: !!valid
    };
    if (!valid) {
      result.errors = [
        {
          property: 'text',
          message: 'missing'
        }
      ];
    }
    return result;
  };
});
