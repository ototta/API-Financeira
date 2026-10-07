const categoriasService = require("../services/categoriasService");

async function listar(req, res, next) {
    try {
        const usuarioId = req.usuario.id;
        const categorias = await categoriasService.listar(usuarioId);

        return res.json(categorias);
    } catch (erro) {
        next(erro);
    }
}

async function buscarPorId(req, res, next) {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;

        const categoria = await categoriasService.buscarPorId(
            id,
            usuarioId
        );

        return res.json(categoria);
    } catch (erro) {
        next(erro);
    }
}

async function cadastrar(req, res, next) {
    try {
        const { nome } = req.body;
        const usuarioId = req.usuario.id;

        const categoria = await categoriasService.cadastrar(
            nome,
            usuarioId
        );

        return res.status(201).json(categoria);
    } catch (erro) {
        next(erro);
    }
}

async function atualizar(req, res, next) {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const usuarioId = req.usuario.id;

        const categoria = await categoriasService.atualizar(
            id,
            nome,
            usuarioId
        );

        return res.json(categoria);
    } catch (erro) {
        next(erro);
    }
}

async function remover(req, res, next) {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;

        await categoriasService.remover(id, usuarioId);

        return res.json({
            mensagem: "Categoria removida com sucesso"
        });
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    listar,
    buscarPorId,
    cadastrar,
    atualizar,
    remover
};