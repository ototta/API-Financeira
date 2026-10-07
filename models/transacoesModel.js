const pool = require("../database/connection");

async function listar(usuarioId, tipo, categoriaId, dataInicio, dataFim) {
    let consulta = `
        SELECT
            transacoes.id,
            transacoes.descricao,
            transacoes.valor,
            transacoes.tipo,
            transacoes.data,
            categorias.nome AS categoria
        FROM transacoes
        INNER JOIN categorias
            ON transacoes.categoria_id = categorias.id
        WHERE transacoes.usuario_id = $1
    `;

    const parametros = [usuarioId];

    if (tipo) {
        parametros.push(tipo);
        consulta += ` AND transacoes.tipo = $${parametros.length} `;
    }

    if (categoriaId) {
        parametros.push(categoriaId);
        consulta += ` AND transacoes.categoria_id = $${parametros.length} `;
    }

    if (dataInicio) {
        parametros.push(dataInicio);
        consulta += ` AND transacoes.data >= $${parametros.length} `;
    }

    if (dataFim) {
        parametros.push(dataFim);
        consulta += ` AND transacoes.data <= $${parametros.length} `;
    }

    consulta += ` ORDER BY transacoes.data DESC `;

    const resultado = await pool.query(consulta, parametros);
    return resultado.rows;
}

async function buscarPorId(id, usuarioId) {
    const resultado = await pool.query(
        `SELECT
            transacoes.id,
            transacoes.descricao,
            transacoes.valor,
            transacoes.tipo,
            transacoes.data,
            categorias.nome AS categoria
         FROM transacoes
         INNER JOIN categorias
            ON transacoes.categoria_id = categorias.id
         WHERE transacoes.id = $1
         AND transacoes.usuario_id = $2`,
        [id, usuarioId]
    );

    return resultado.rows[0];
}

async function cadastrar(descricao, valor, tipo, data, categoriaId, usuarioId) {
    const resultado = await pool.query(
        `INSERT INTO transacoes
            (descricao, valor, tipo, data, categoria_id, usuario_id)
         VALUES
            ($1, $2, $3, $4, $5, $6)
         RETURNING
            id, descricao, valor, tipo, data, categoria_id, usuario_id`,
        [descricao, valor, tipo, data, categoriaId, usuarioId]
    );

    return resultado.rows[0];
}

async function atualizar(id, descricao, valor, tipo, data, categoriaId, usuarioId) {
    const resultado = await pool.query(
        `UPDATE transacoes
         SET
            descricao = $1,
            valor = $2,
            tipo = $3,
            data = $4,
            categoria_id = $5
         WHERE id = $6
         AND usuario_id = $7
         RETURNING
            id, descricao, valor, tipo, data, categoria_id, usuario_id`,
        [descricao, valor, tipo, data, categoriaId, id, usuarioId]
    );

    return resultado.rows[0];
}

async function remover(id, usuarioId) {
    const resultado = await pool.query(
        `DELETE FROM transacoes
         WHERE id = $1
         AND usuario_id = $2
         RETURNING id, descricao`,
        [id, usuarioId]
    );

    return resultado.rows[0];
}

async function resumo(usuarioId, dataInicio, dataFim) {
    let consulta = `
        SELECT
            COALESCE(
                SUM(
                    CASE
                        WHEN tipo = 'receita'
                        THEN valor
                        ELSE 0
                    END
                ), 0
            ) AS receitas,
            COALESCE(
                SUM(
                    CASE
                        WHEN tipo = 'despesa'
                        THEN valor
                        ELSE 0
                    END
                ), 0
            ) AS despesas
        FROM transacoes
        WHERE usuario_id = $1
    `;

    const parametros = [usuarioId];

    if (dataInicio) {
        parametros.push(dataInicio);
        consulta += ` AND data >= $${parametros.length} `;
    }

    if (dataFim) {
        parametros.push(dataFim);
        consulta += ` AND data <= $${parametros.length} `;
    }

    const resultado = await pool.query(consulta, parametros);
    const receitas = Number(resultado.rows[0].receitas);
    const despesas = Number(resultado.rows[0].despesas);

    return {
        receitas,
        despesas,
        saldo: receitas - despesas
    };
}

async function resumoPorCategoria(usuarioId, dataInicio, dataFim) {
    let consulta = `
        SELECT
            categorias.id,
            categorias.nome AS categoria,
            COALESCE(SUM(transacoes.valor), 0) AS total
        FROM transacoes
        INNER JOIN categorias
            ON transacoes.categoria_id = categorias.id
        WHERE transacoes.usuario_id = $1
        AND transacoes.tipo = 'despesa'
    `;

    const parametros = [usuarioId];

    if (dataInicio) {
        parametros.push(dataInicio);
        consulta += ` AND transacoes.data >= $${parametros.length} `;
    }

    if (dataFim) {
        parametros.push(dataFim);
        consulta += ` AND transacoes.data <= $${parametros.length} `;
    }

    consulta += `
        GROUP BY categorias.id, categorias.nome
        ORDER BY total DESC
    `;

    const resultado = await pool.query(consulta, parametros);

    return resultado.rows.map(item => ({
        categoriaId: item.id,
        categoria: item.categoria,
        total: Number(item.total)
    }));
}

module.exports = {
    listar,
    buscarPorId,
    cadastrar,
    atualizar,
    remover,
    resumo,
    resumoPorCategoria
};