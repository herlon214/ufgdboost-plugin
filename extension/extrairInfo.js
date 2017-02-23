function extrairInfo($tr) {
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
