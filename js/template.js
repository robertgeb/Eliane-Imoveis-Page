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


  return {
    set: function (name, template) {
      templates[name] = template;
    },
    run: function (name, data) {
      var template = templates[name];
      var finalView = '';
      var loops = [];
      if (!data) {
        return markdown.makeHtml(template);
      }

      function setData(match, dataName, offset, string) {
        var value = data[dataName];
        if (value)
          return value;
        else
          return '';
      }

      function setLoop(match, loop, offset, string){
        var loopView = '';

        function setLoopData(match, dataName, offset, string) {
          var value = data[dataName];
          if (typeof value === 'string') {
            return value;
          }
          else if (value === undefined) {
            return '%endloop%';
          }
          else{
            value = data[dataName].shift();
            if (value)
              return value;
            else
            {
              return '%endloop%';
            }
          }
        }

        while (true) {
          var iteration = loop.replace(/%(\w+)%/, setLoopData);
          if (iteration.indexOf('%endloop%') > -1) {
            break;
          }
          loopView += iteration + '\n\n';
        }
        return loopView;
      }
      // Compiling loops
      finalView = template.replace(/%loop%\n(\s\s.*\n)/g, setLoop);
      // Compiling generic data
      finalView = finalView.replace(/%(\w+)%/g, setData);

      element.innerHTML = markdown.makeHtml(finalView);

    }
  }
})();
