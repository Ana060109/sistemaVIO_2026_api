

module.exports = function validateUser({
    cpf, 
    nome, 
    email, 
    senha, 
    telefone, 
    data_nascimento,
}){
    if(!cpf||!nome||!email||!senha||!telefone||!data_nascimento){
        return{error: "Todos os campos devem ser preenchidos"};
    }

    if(isNaN(cpf) || cpf.length !== 11){
        return{error: "CPF inválido. Deve conter 11 dígitos numéricos"};
    }

    if(!email.includes("@")){
        return{error: "Email inválido. Deve conter @"};
    }

    if(isNaN(telefone)|| telefone.length !== 11){
        return{error: "Telefone inválido. Deve conter 11 dígitos numéricos"}
    }

    return null;
}