const transacoesService = require("../services/transacoesService");

async function resumo(req, res, next) {
    try {
        const usuarioId = req.usuario.id;
        const { dataInicio, dataFim } = req.query;

        const resultado = await transacoesService.resumo(
            usuarioId,
            dataInicio,
            dataFim
        );

        return res.json(resultado);
    } catch (erro) {
        next(erro);
    }
}

async function resumoPorCategoria(req, res, next) {
    try {
        const usuarioId = req.usuario.id;
        const { dataInicio, dataFim } = req.query;

        const resultado =
            await transacoesService.resumoPorCategoria(
                usuarioId,
                dataInicio,
                dataFim
            );

        return res.json(resultado);
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    resumo,
    resumoPorCategoria
};