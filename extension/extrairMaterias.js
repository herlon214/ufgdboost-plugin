$(document).ready(function() {
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

  /**
   * Por que verificar se a matéria já existe?
   * R: A ordem das matérias no histórico é do mais recente para o mais velho.
   * Então, quando você reprova e depois passa na matéria (se ela não mudar de número)
   * vai aparecer como reprovado, pois é o item mais antigo no array
   */
  var materiaJaExiste = function(materias, materia) {
    for(var i = 0; i < materias.length; i++) {
      if(materias[i].codigo == materia.codigo) return true;
    }

    return false;
  }

  var pegarConteudoMaterias = function() {
    return fetch('https://sigecad-academico.ufgd.edu.br/consultar/historico.jsf',{
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

  $('.mostrarMateriasConcluidas').remove();
  $('#formAcoes td').eq(0).append("<button type='button' class='btn btn-success mostrarMateriasConcluidas' title='UFGD Boost'>Comparar disciplinas</button>");
  $('.mostrarMateriasConcluidas').click(mostrarMateriasConcluidas);
})
