'use strict';

template.set('404', 'Página não encontrada');

router.set('index', function (reqParams) {
  // Baixando template
  request.template('index').then(function (pageTemplate) {
    // Configurando template
    template.set('index', pageTemplate)
    // Requisitando dados para o template
    request.imoveisList().then(function (imoveisList) {

      const quantidadeImoveis = 5;
      let paginaAtual = reqParams.pag || 1;
      template.run('index', imoveisList.slice(paginaAtual*quantidadeImoveis-10, paginaAtual*quantidadeImoveis))

    }); // TODO: Handle promise reject
  }); // TODO: Handle promise reject
});

router.set('imovel', function (reqParams) {

  request.template('imovel').then(function (requestEvent) {

    let pageTemplate = requestEvent.target.response;
    let status = requestEvent.target.status;

    if (pageTemplate && status === 200){

      template.set('imovel', pageTemplate);
      request.imovel(reqParams.id).then(function (requestEvent) {
        let imovel = requestEvent.target.response;
        let status = requestEvent.target.status;

        if (imovel && status === 200)
          template.run('imovel', imovel);
        else {
          template.run('404');
        }
      }); // TODO: Treat promise reject
    }
    else
      console.log(template); // TODO: Treat request errors
  });// TODO: Treat promise reject
});

// TODO: contato controller
// TODO: map
// TODO: Buscar

window.addEventListener('hashchange', router.run);
window.addEventListener('load', router.run);
