const transacoesModel = require("../models/transacoesModel");
const categoriasModel = require("../models/categoriasModel");

async function cadastrar(
    descricao,
    valor,
    tipo,
    data,
    categoriaId,
    usuarioId
) {
    const categoria = await categoriasModel.buscarPorId(
        categoriaId,
        usuarioId
    );

    if (!categoria) {
        throw new Error("Categoria não encontrada");
    }

    return await transacoesModel.cadastrar(
        descricao,
        valor,
        tipo,
        data,
        categoriaId,
        usuarioId
    );
}

async function listar(usuarioId, tipo, categoriaId, dataInicio, dataFim) {
    return await transacoesModel.listar(
        usuarioId,
        tipo,
        categoriaId,
        dataInicio,
        dataFim
    );
}

async function buscarPorId(id, usuarioId) {
    const transacao = await transacoesModel.buscarPorId(id, usuarioId);

    if (!transacao) {
        throw new Error("Transação não encontrada");
    }

    return transacao;
}

async function atualizar(
    id,
    descricao,
    valor,
    tipo,
    data,
    categoriaId,
    usuarioId
) {
    await buscarPorId(id, usuarioId);

    const categoria = await categoriasModel.buscarPorId(
        categoriaId,
        usuarioId
    );

    if (!categoria) {
        throw new Error("Categoria não encontrada");
    }

    return await transacoesModel.atualizar(
        id,
        descricao,
        valor,
        tipo,
        data,
        categoriaId,
        usuarioId
    );
}

async function remover(id, usuarioId) {
    await buscarPorId(id, usuarioId);
    return await transacoesModel.remover(id, usuarioId);
}

async function resumo(usuarioId, dataInicio, dataFim) {
    return await transacoesModel.resumo(
        usuarioId,
        dataInicio,
        dataFim
    );
}

async function resumoPorCategoria(usuarioId, dataInicio, dataFim) {
    return await transacoesModel.resumoPorCategoria(
        usuarioId,
        dataInicio,
        dataFim
    );
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    remover,
    resumo,
    resumoPorCategoria
};