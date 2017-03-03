'use strict';

//
// Simple http request
//
var request = (function () {
  return {
    page: function (page) {
      return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', resolve);
        oReq.addEventListener('error', reject);
        oReq.open('GET', '/pages/'+page+'.md');
        oReq.send();
      });
    }
  }
})()
