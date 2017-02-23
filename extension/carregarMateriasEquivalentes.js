var carregarMateriasEquivalentes = function() {
  browser.storage.local.get('materiasEquivalentes')
  .then(function(res) {
    res[0].materiasEquivalentes.forEach(function(materia) {
      $('tr').each(function() {
        if($(this).find('td').eq(0).text() == materia.codigo) {
          $(this).addClass('carregadoEquivalente').css({background: 'red'});
        }
      })
    })
  })
}
