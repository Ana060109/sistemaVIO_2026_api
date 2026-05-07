

module.exports = function validateEvento({
    nome, 
    descricao, 
    data_hora, 
    local, 
    fk_id_organizador
}){
    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return { error: "Todos os campos devem ser preenchidos" };
    }

    return null;
}