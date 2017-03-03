'use strict';

//
// Simple Router
//
var router = (function () {
  var el = document.getElementById('content');
  var markdown = new showdown.Converter();

  markdown.setFlavor('github');
  markdown.setOption('requireSpaceBeforeHeadingText', true);

  return {
    run: function () {
      var url = location.pathname.slice(1) || 'index';

      request.page(url).then(function (e) {
        let page = e.target.response;
        let status = e.target.status;
        
        if (page && status === 200)
          el.innerHTML = markdown.makeHtml(template.run(url, page));
        else
          el.innerHTML = markdown.makeHtml('Página não encontrada');
      });
    }
  }
})()
