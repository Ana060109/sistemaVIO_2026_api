const connect = require("../db/connect");

module.exports = async function validateEmail(email, cpf=null){

    return new Promise ((resolve, reject)=>{
        const query = `SELECT cpf FROM usuario WHERE email=?`;
        
        connect.query(query, [email], (err, result)=>{
            if(err){
                reject("Erro ao verificar E-mail");
            }
            else if(result.length > 0){
                const cpfEcontrado = result[0].cpf;

                if(cpf && cpfEcontrado !== cpf){
                    resolve({error: "E-mail já cadastrado para outro usuário"})
                } else{
                    resolve(null)
                }
            }
            else{
                resolve(null);
            }
        })
    })
}