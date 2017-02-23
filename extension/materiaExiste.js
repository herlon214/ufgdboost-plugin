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
