const mysql = require("mysql2")

const pool = mysql.createPool({
    connectionLimit:10,
    host: process.env.BD_HOST, // Mude para o seu host (IP)
    user: process.env.DB_USER, // Mude para o seu User do Mysql
    password: process.env.DB_PASSWORD, // Mude para a senha do seu User
    database: process.env.DB_NAME // Mude para o seu database JÁ criado
})

module.exports = pool;