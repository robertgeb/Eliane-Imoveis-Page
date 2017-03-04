'use strict';

template.set('404', 'Página não encontrada');

router.set('index', function (reqParams) {
  // Baixando template
  request.template('index').then(function (requestEvent) {

    let template = requestEvent.target.response;
    let status = requestEvent.target.status;
    // Configurando template
    template.set('index', template)
    // Requisitando dados para o template
    if (template && status === 200)
      request.imoveisList().then(function (requestEvent) {

        const quantidadeImoveis = 5;
        let imoveisList = JSON.parse(requestEvent.target.response);
        let paginaAtual = reqParams.pag || 1;
        var firstImovelId = (paginaAtual*10)-10;
        var imoveisToShow = [];

        // Corrente de requisições
        requestImovelChain = function requestImovelChain(id) {
          if (id == firstImovelId+quantidadeImoveis) {
            template.run('index', {imoveis: imoveisToShow});
            return;
          }
          request.imovel(id).then(function (requestEvent) {
            let imovel = JSON.parse(requestEvent.target.response);
            imoveisToShow.push(imovel);
            requestNextImovel(id+1);
          });
        }

        requestImovelChain(firstImovelId);

      }); // TODO: Handle promise reject
    else
      template.run('404');
  }); // TODO: Handle promise reject
});

router.set('imovel', function (reqParams) {

  request.template('imovel').then(function (requestEvent) {

    let template = requestEvent.target.response;
    let status = requestEvent.target.status;

    if (template && status === 200){

      template.set('imovel', template);
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
