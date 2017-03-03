'use strict';

template.set('404', 'Página não encontrada');

router.set('index', function () {

  request.page('index').then(function (e) {

    let page = e.target.response;
    let status = e.target.status;

    template.set('index', page)
    if (page && status === 200)
      template.run('index');
    else
      template.run('404');
  }); // TODO: Handle promise reject
});

router.set('imovel', function (params) {

  request.page('imovel').then(function (e) {

    let page = e.target.response;
    let status = e.target.status;

    if (page && status === 200){

      template.set('imovel', page);
      request.imovel(params.id).then(function (e) {
        let imovel = e.target.response;
        let status = e.target.status;

        if (imovel && status === 200)
          template.run('imovel', imovel);
        else {
          template.run('404');
        }
      }); // TODO: Treat promise reject
    }
    else
      console.log(page); // TODO: Treat request errors
  });// TODO: Treat promise reject
});

window.addEventListener('hashchange', router.run);
window.addEventListener('load', router.run);
