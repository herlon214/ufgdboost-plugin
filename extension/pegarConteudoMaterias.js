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
