'use strict';

//
// Simple Router
//
var router = (function () {
  var controllers = {};

  function searchToObject() {
    var pairs = window.location.search.substring(1).split("&"),
      obj = {},
      pair,
      i;

    for ( i in pairs ) {
      if ( pairs[i] === "" ) continue;

      pair = pairs[i].split("=");
      obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
    }

    return obj;
  }

  return {
    set: function (path, controller) {
      controllers[path] = controller;
    },
    run: function () {
      var url = location.pathname.slice(1) || 'index';

      try {
        controllers[url](searchToObject(), url);
      } catch (e) {
        console.log('FAIL');
        console.log(url);
        console.log(e);

      }
    }
  }
})()
