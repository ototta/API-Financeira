const transacoesService = require("../services/transacoesService");

async function cadastrar(req, res, next) {
    try {
        const {
            descricao,
            valor,
            tipo,
            data,
            categoriaId
        } = req.body;

        const usuarioId = req.usuario.id;

        const transacao = await transacoesService.cadastrar(
            descricao,
            valor,
            tipo,
            data,
            categoriaId,
            usuarioId
        );

        return res.status(201).json(transacao);
    } catch (erro) {
        next(erro);
    }
}

async function listar(req, res, next) {
    try {
        const usuarioId = req.usuario.id;
        const {
            tipo,
            categoriaId,
            dataInicio,
            dataFim
        } = req.query;

        const transacoes = await transacoesService.listar(
            usuarioId,
            tipo,
            categoriaId,
            dataInicio,
            dataFim
        );

        return res.json(transacoes);
    } catch (erro) {
        next(erro);
    }
}

async function buscarPorId(req, res, next) {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;

        const transacao = await transacoesService.buscarPorId(
            id,
            usuarioId
        );

        return res.json(transacao);
    } catch (erro) {
        next(erro);
    }
}

async function atualizar(req, res, next) {
    try {
        const { id } = req.params;
        const {
            descricao,
            valor,
            tipo,
            data,
            categoriaId
        } = req.body;

        const usuarioId = req.usuario.id;

        const transacao = await transacoesService.atualizar(
            id,
            descricao,
            valor,
            tipo,
            data,
            categoriaId,
            usuarioId
        );

        return res.json(transacao);
    } catch (erro) {
        next(erro);
    }
}

async function remover(req, res, next) {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;

        await transacoesService.remover(id, usuarioId);

        return res.json({
            mensagem: "Transação removida com sucesso"
        });
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    remover
};