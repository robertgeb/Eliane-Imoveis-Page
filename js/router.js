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
      var url = location.pathname.slice(1) || '/';
      if (url === '/')
        request.page('index').then(function (e) {
          let page = e.target.response;
          el.innerHTML = markdown.makeHtml(page);;
        });
      else
        request.page(url).then(function (e) {
          let page = e.target.response;
          let status = e.target.status;
          page = template.run(url, page);
          if (page && status === 200)
            el.innerHTML = markdown.makeHtml(page);
          else
            el.innerHTML = markdown.makeHtml('Post not found');
        });
    }
  }
})()
