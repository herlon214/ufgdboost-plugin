// Escopo 'this' é dentro do elemento jQuery
var selecionarMateria = function() {
  if($(this).hasClass('equivalencia')) {
    $(this).css({'background': ''}).removeClass('equivalencia');
  }else {
    $(this).css({'background': 'yellow'}).addClass('equivalencia');
  }
}

var selecionarMateriasEquivalentes = function() {

  // Verifica se o usuário já está selecionando uma matéria
  if(!estado.materiasEquivalentes.selecionando) {
    // Mostra que está selecionando uma matéria
    estado.materiasEquivalentes.selecionando = true

    alert('Selecione as matérias com equivalência, depois clique no botão "Terminado"');

    // Altera o botão de selecionar para "Terminado"
    $('.materiasEquivalentes').text('Terminado');

    // Ação do clique na matéria
    $('tr.ui-widget-content').click(selecionarMateria);

  }else { // Usuário já selecionou as matérias

    // Altera o botão de selecionar para "Selecionar matérias equivalentes"
    $('.materiasEquivalentes').text('Selecionar matérias equivalentes');

    var materiasSelecionadas = [];
    $('tr.equivalencia').each(function() {
      materiasSelecionadas.push({
        nome: $(this).find('td').eq(1).text(),
        codigo: $(this).find('td').eq(0).text()
      })
    });


    var localEquivalente = browser.storage.local.get('materiasEquivalentes')
    localEquivalente.then(function(res) {

      // Verifica se já existe alguma matéria equivalente salva
      if(typeof res[0] == "object") { // Não existe
        browser.storage.local.set({
          materiasEquivalentes: materiasSelecionadas
        })
      }else { // Existe
        var novoMateriasEquivalente = []


        // Insere as equivalencias antigas
        res[0].materiasEquivalentes.forEach(function(materia) {
          novoMateriasEquivalente.push(materia);
        });

        // Verifica se as matérias já estão salvas
        materiasSelecionadas.forEach(function(materia) {
          // Só insere as matérias que não existem
          if(!materiaJaExiste(res[0].materiasEquivalentes, materia)) {
            novoMateriasEquivalente.push(materia);
          }
        });

        // Salva no localStorage
        browser.storage.local.set({
          materiasEquivalentes: novoMateriasEquivalente
        })
      }

      // Remove as matérias equivalentes
      $('tr.equivalencia').removeClass('equivalencia').css({'background': ''});

      carregarMateriasEquivalentes();
    });
  }



}
