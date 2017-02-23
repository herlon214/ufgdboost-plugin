$(document).ready(function() {
  $('.mostrarMateriasConcluidas').remove();
  $('#formAcoes td').eq(0).append(" <button type='button' class='btn btn-success mostrarMateriasConcluidas' title='UFGD Boost'>Comparar matérias</button>");
  $('.mostrarMateriasConcluidas').click(mostrarMateriasConcluidas);

  $('.materiasEquivalentes').remove();
  $('#formAcoes td').eq(0).append(" <button type='button' class='btn btn-info materiasEquivalentes' title='UFGD Boost'>Selecionar matérias equivalentes</button>");
  $('.materiasEquivalentes').click(selecionarMateriasEquivalentes);

  carregarMateriasEquivalentes()
});
