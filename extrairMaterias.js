Zepto(function($) {
var extrairInfo = function($tr) {
  var conteudoPrincipal = $tr.find('td').eq(1).text();

  if(conteudoPrincipal) {
    var codigo = conteudoPrincipal.split(' - ')[0];
    var nome = conteudoPrincipal.split(' - ')[1];
    var status = $tr.find('td').last().text();

    return {
      codigo: codigo,
      nome: nome.trim(), // Usa o trim para retirar os espaços em branco extra
      status: status.trim() // Usa o trim para retirar os espaços em branco extra
    }
  }else {
    return null
  }



}

var pegarConteudoMaterias = function() {
  return fetch('http://sigecad-academico.ufgd.edu.br/consultar/historico.jsf',{
      credentials: 'include',
      method: 'GET'
    }).then(function(resp) {
      return resp.text()
    }).then(function(resp) {
      return resp.split('<body>')[1]
    })
}

var mostrarMateriasConcluidas = function() {
  var materias = []

  // Pega o html com o historico das matérias concluídas
  pegarConteudoMaterias()
  .then(function(html) {

    $(html).find('.painel-conteudo table tr').forEach(function(item) {
      var materia = extrairInfo($(item))
      if(materia) {
        materias.push(materia)
      }
    });

    // Marca as matérias já concluídas
    materias.forEach(function(materia) {
      $('td').forEach(function(item) {
        if($(item).text() == materia.codigo) {
          $(item).parent().find('td').forEach(function(subitem) {

            $(subitem).removeClass('reprovado'); // Fix para as matérias que a pessoa reprovou mas depois passou

            // Verifica o status da matéria
            switch(materia.status) {
              case "AP": $(subitem).addClass('aprovado'); break;
              case "DS": $(subitem).addClass('aprovado'); break;
              case "RP": $(subitem).addClass('reprovado'); break;
              case "MA": $(subitem).addClass('matriculado'); break;
            }
          })
        }
      })
    })
  })
  .catch(function(err) {
    console.log(err)
    alert('Falha ao pegar o conteúdo')
  })
}

  $('.mostrarMateriasConcluidas').remove();
  $('#formAcoes td').eq(0).append("<button type='button' class='btn btn-success mostrarMateriasConcluidas' title='UFGD Boost'>Comparar matérias</button>");
  $('.mostrarMateriasConcluidas').click(mostrarMateriasConcluidas);

})
