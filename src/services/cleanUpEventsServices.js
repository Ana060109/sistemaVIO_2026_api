const connect = require("../db/connect");

async function cleanUpEventsServices() {
    const now = new Date();

    //Funcionalidade para padronizar a data antes de enviar ao banco de dados
    // Formato MySQL DateTime = (YYY-MM-DD HH:MM:SS)
    const formattedDateTime = now.toISOString().slice(0,19).replace('T',' ');

    const query = `DELETE FROM evento WHERE data_hora < ?`;
    const values = [formattedDateTime];

    return new Promise((resolve, reject) => {
        connect.query(query, values, function (err, results) {
            if (err) {
                console.error("Erro ao limpar eventos passados: ", err);
                return reject(new Error("Erro ao limpar eventos passados"));
            }

            console.log(`Eventos removidos: ${results.affectedRows}`);
            resolve(`Eventos Removidos: ${results.affectedRows}`)
        });
    });
}

module.exports = cleanUpEventsServices;