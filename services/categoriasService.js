const categoriasModel = require("../models/categoriasModel");

async function listar(usuarioId) {
    return await categoriasModel.listar(usuarioId);
}

async function buscarPorId(id, usuarioId) {
    const categoria = await categoriasModel.buscarPorId(id, usuarioId);

    if (!categoria) {
        throw new Error("Categoria não encontrada");
    }

    return categoria;
}

async function cadastrar(nome, usuarioId) {
    const categoriaExistente = await categoriasModel.buscarPorNome(nome, usuarioId);

    if (categoriaExistente) {
        throw new Error("Categoria já cadastrada");
    }

    return await categoriasModel.cadastrar(nome, usuarioId);
}

async function atualizar(id, nome, usuarioId) {
    await buscarPorId(id, usuarioId);

    const categoriaComMesmoNome =
        await categoriasModel.buscarPorNome(nome, usuarioId);

    if (
        categoriaComMesmoNome &&
        categoriaComMesmoNome.id !== Number(id)
    ) {
        throw new Error("Categoria já cadastrada");
    }

    return await categoriasModel.atualizar(id, nome, usuarioId);
}

async function remover(id, usuarioId) {
    await buscarPorId(id, usuarioId);
    return await categoriasModel.remover(id, usuarioId);
}

module.exports = {
    listar,
    buscarPorId,
    cadastrar,
    atualizar,
    remover
};