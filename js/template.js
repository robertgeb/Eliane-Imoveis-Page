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
      for (var i = 0; i < variables.length; i++) {
        code.replace('%'+variables[i].name+'%', variables[i].value );
      }
      return code;
    }
  }
})();
