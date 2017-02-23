var mostrarMateriasConcluidas = function() {
  var materias = []

  // Pega o html com o historico das matérias concluídas
  pegarConteudoMaterias()
  .then(function(html) {

    $(html).find('.painel-conteudo table tr').each(function() {
      var materia = extrairInfo($(this))
      if(materia) {
        // Verifica se a matéria já está no array
        if(!materiaJaExiste(materias, materia)) {
          materias.push(materia)
        }
      }
    });

    // Marca as matérias já concluídas
    materias.forEach(function(materia) {
      $('td').each(function() {
        if($(this).text() == materia.codigo) {
          $(this).parent().find('td').each(function() {

            $(this).removeClass('reprovado'); // Fix para as matérias que a pessoa reprovou mas depois passou

            // Verifica o status da matéria
            switch(materia.status) {
              case "AP": $(this).addClass('aprovado'); break;
              case "APE": $(this).addClass('aprovado'); break;
              case "DS": $(this).addClass('aprovado'); break;
              case "DC": $(this).addClass('aprovado'); break;
              case "RP": $(this).addClass('reprovado'); break;
              case "RF": $(this).addClass('reprovado'); break;
              case "RN": $(this).addClass('reprovado'); break;
              case "MA": $(this).addClass('matriculado'); break;
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
