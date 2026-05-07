

module.exports = function validateOrganizador({
    nome, 
    email, 
    senha, 
    telefone
}){
    if (!nome || !email || !senha || !telefone) {
      return { error: "Todos os campos devem ser preenchidos" };
    }
    if (!email.includes("@")) {
      return { error: "Email inválido. Deve conter @" };
    }
    if (telefone.length !== 11 || isNaN(telefone)) {
      return { error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos" };
    }

    return null;
}