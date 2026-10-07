const pool = require("../database/connection");

async function buscarPorEmail(email) {
    const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email]
    );

    return resultado.rows[0];
}

async function cadastrar(nome, email, senha) {
    const resultado = await pool.query(
        `INSERT INTO usuarios (nome, email, senha)
         VALUES ($1, $2, $3)
         RETURNING id, nome, email, criado_em`,
        [nome, email, senha]
    );

    return resultado.rows[0];
}

async function buscarPorId(id) {
    const resultado = await pool.query(
        `SELECT id, nome, email, criado_em
         FROM usuarios
         WHERE id = $1`,
        [id]
    );

    return resultado.rows[0];
}

module.exports = { buscarPorEmail, cadastrar, buscarPorId };