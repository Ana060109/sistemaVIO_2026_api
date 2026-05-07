const connect = require("../db/connect");

module.exports = async function validateEmailOrganizador(email, id_organizador=null){

    return new Promise ((resolve, reject)=>{
        const query = `SELECT id_organizador FROM organizador WHERE email=?`;
        
        connect.query(query, [email], (err, result)=>{
            if(err){
                reject("Erro ao verificar E-mail");
            }
            else if(result.length > 0){
                const idEcontrado = result[0].id_organizador;

                if(id_organizador && idEcontrado !== id_organizador){
                    resolve({error: "E-mail já cadastrado para outro organizador"})
                } else if (!id_organizador){
                    resolve({error: "E-mail já cadastrado para outro organizador"})
                }
                else{
                    resolve(null)
                }
            }
            else{
                resolve(null);
            }
        })
    })
}