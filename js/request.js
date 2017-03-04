'use strict';

//
// Simple http request
//
var request = (function () {
  return {
    template: function (page) {
      return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', resolve);
        oReq.addEventListener('error', reject);
        oReq.open('GET', '/pages/'+page+'.md');
        oReq.send();
      });
    },
    imovel: function (id) {
      return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', resolve);
        oReq.addEventListener('error', reject);
        oReq.open('GET', '/imoveis/'+id+'/imovel.json');
        oReq.send();
      });
    },
    imoveisList: function () {
      return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', resolve);
        oReq.addEventListener('error', reject);
        oReq.open('GET', '/imoveis/imoveis.json');
        oReq.send();
      });
    }
  }
})()
