const pool = require("../database/connection");

async function listar(usuarioId) {
    const resultado = await pool.query(
        `SELECT id, nome
         FROM categorias
         WHERE usuario_id = $1
         ORDER BY id`,
        [usuarioId]
    );

    return resultado.rows;
}

async function buscarPorId(id, usuarioId) {
    const resultado = await pool.query(
        `SELECT id, nome
         FROM categorias
         WHERE id = $1
         AND usuario_id = $2`,
        [id, usuarioId]
    );

    return resultado.rows[0];
}

async function buscarPorNome(nome, usuarioId) {
    const resultado = await pool.query(
        `SELECT id, nome
         FROM categorias
         WHERE nome = $1
         AND usuario_id = $2`,
        [nome, usuarioId]
    );

    return resultado.rows[0];
}

async function cadastrar(nome, usuarioId) {
    const resultado = await pool.query(
        `INSERT INTO categorias (nome, usuario_id)
         VALUES ($1, $2)
         RETURNING id, nome`,
        [nome, usuarioId]
    );

    return resultado.rows[0];
}

async function atualizar(id, nome, usuarioId) {
    const resultado = await pool.query(
        `UPDATE categorias
         SET nome = $1
         WHERE id = $2
         AND usuario_id = $3
         RETURNING id, nome`,
        [nome, id, usuarioId]
    );

    return resultado.rows[0];
}

async function remover(id, usuarioId) {
    const resultado = await pool.query(
        `DELETE FROM categorias
         WHERE id = $1
         AND usuario_id = $2
         RETURNING id, nome`,
        [id, usuarioId]
    );

    return resultado.rows[0];
}

module.exports = {
    listar,
    buscarPorId,
    buscarPorNome,
    cadastrar,
    atualizar,
    remover
};