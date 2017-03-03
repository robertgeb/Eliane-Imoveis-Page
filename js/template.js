'use strict';

//
//  Simple template engine
//
var template = (function () {
  var templates = {};
  return {
    set: function (name, variables) {
      templates[name] = variables;
    },
    run: function (name, code) {
      var variables = templates[name];
      console.log(code);
      console.log(variables);
      console.log(name);
      for (var i = 0; i < variables.length; i++) {
        code = code.replace('%'+variables[i].name+'%', variables[i].value);
      }
      console.log(code);
      return code;
    }
  }
})();
