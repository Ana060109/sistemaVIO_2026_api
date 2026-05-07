const connect = require("../db/connect");

module.exports = async function validateCpf(cpf){

    const query = `SELECT cpf FROM usuario WHERE cpf=?`;
    return new Promise ((resolve, reject)=>{
        connect.query(query, [cpf], (err, result)=>{
            if(err){
                reject("Erro ao verificar CPF")
            }
            else if(result.length > 0){
                resolve({error: "CPF já cadastrado"})
            }
            else{
                resolve(null);
            }
        })
    })
}