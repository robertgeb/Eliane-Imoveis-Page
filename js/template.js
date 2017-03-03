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
      var loops = [];

      function setVariables(match, variable, offset, string) {
        var value = variables[variable];
        if (value)
          return value;
        else
          return '';
      }

      function setLoopVariables(match, variable, offset, string){
        var value = '';
        function setVariable(match, variable2, offset, string) {
          var valor2 = variables[variable2];
          if (typeof valor2 === 'string') {
            return valor2;
          }
          else if (valor2 === undefined) {
            return '%endloop%';
          }
          else{
            valor2 = variables[variable2].shift();
            if (valor2)
              return valor2;
            else
            {
              return '%endloop%';
            }
          }
        }

        while (true) {
          var loop = variable.replace(/%(\w+)%/, setVariable);
          if (loop.indexOf('%endloop%') > -1) {
            break;
          }
          value += loop + '\n\n';
        }
        return value;
      }

      code = code.replace(/%loop%\n(\s\s.*\n)/g, setLoopVariables);
      code = code.replace(/%(\w+)%/g, setVariables);
      return code;

    }
  }
})();
