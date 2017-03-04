'use strict';

//
//  Simple template engine
//
var template = (function () {
  var templates = {};
  var element = document.getElementById('content');
  var markdown = new showdown.Converter();

  markdown.setFlavor('github');
  markdown.setOption('requireSpaceBeforeHeadingText', true);

  function compileTemplate(template, content) {
    var compiled;
    compiled = template.replace(/%(\w+)%/g, "${content.$1?content.$1:''}");
    return eval('`'+compiled + '`');
  }

  function compileLoop(template, contentArray) {
    var compiled = '';
    for (var i = 0; i < contentArray.length; i++) {
      compiled += compileTemplate(template, contentArray[i]) + '\n\n';
    }
    return compiled;
  }

  return {
    set: function (name, template) {
      templates[name] = template;
    },
    run: function (name, content) {

      var template = templates[name];
      var compiled = '';
      var loops = [];

      // Compilando loops
      compiled = template.replace(/%loop\s(\w+)%(.*)%fimLoop%/, function (match, loopId, loopTemplate) {
        return compileLoop(loopTemplate, content[loopId] || []);
      });
      // Compilando outros dados
      compiled = compileTemplate(compiled, content);

      element.innerHTML = markdown.makeHtml(compiled);
      // TODO: Add customs css class
      element.className += name;

    }
  }
})();
