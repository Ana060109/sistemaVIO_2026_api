const connect = require("../db/connect");
const validateEmailOrganizador = require("../services/validateEmailOrganizador");
const validateOrganizador = require("../services/validateOrganizador");

module.exports = class organizadorController {
  static async createOrganizador(req, res) {
    const { nome, email, senha, telefone } = req.body;

    // Validações
    if(validateOrganizador(req.body)) {
      return res.status(400).json(validateOrganizador(req.body));
    }
    
    // Query de inserção
    const query = `INSERT INTO organizador (nome, email, senha, telefone) VALUES (?, ?, ?, ?)`;
    const values = [nome, email, senha, telefone];

    try {

      const emailError = await validateEmailOrganizador(email);
      if(emailError) {
        return res.status(400).json(emailError);
      }

      connect.query(query, values, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res.status(201).json({ message: "Organizador criado com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getAllOrganizadores(req, res) {
    const query = `SELECT * FROM organizador`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res.status(200).json({ message: "Obtendo todos os organizadores", organizadores: results });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getOrganizadorById(req, res) {
    const organizadorId = req.params.id;
    const query = `SELECT * FROM organizador WHERE id_organizador = ?`;
    const values = [organizadorId];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "Organizador não encontrado" });
        }

        return res.status(200).json({ message: "Organizador encontrado", organizador: results[0] });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async updateOrganizador(req, res) {
    const {id_organizador, nome, email, senha, telefone } = req.body;

    // Validações
    if(validateOrganizador(req.body)) {
      return res.status(400).json(validateOrganizador(req.body));
    }

    const query = `UPDATE organizador SET nome = ?, email = ?, senha = ?, telefone = ? WHERE id_organizador = ?`;
    const values = [nome, email, senha, telefone, id_organizador];

    try {

      const emailError = await validateEmailOrganizador(email, id_organizador);
      if(emailError) {
        return res.status(400).json(emailError);
      }


      connect.query(query, values, function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
					
        if (results.affectedRows === 0) { 
          return res.status(404).json({ error: "Organizador não encontrado" });
        }

        return res.status(200).json({ message: "Organizador atualizado com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async deleteOrganizador(req, res) {
    const organizadorId = req.params.id;
    const query = `DELETE FROM organizador WHERE id_organizador = ?`;
    const values = [organizadorId];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Organizador não encontrado" });
        }

        return res.status(200).json({ message: "Organizador excluído com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
