'use strict';

//
// Simple http request
//
var request = (function () {
  var host = location.host;
  return {
    page: function (page) {
      return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', resolve);
        oReq.addEventListener('error', reject);
        console.log(host);
        oReq.open('GET', host+'/pages/'+page+'.md');
        oReq.send();
      });
    }
  }
})()
