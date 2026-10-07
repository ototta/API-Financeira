const usuariosService = require("../services/usuariosService");

async function cadastrar(req, res, next) {
    try {
        const { nome, email, senha } = req.body;

        await usuariosService.cadastrar(nome, email, senha);

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso"
        });
    } catch (erro) {
        next(erro);
    }
}

async function login(req, res, next) {
    try {
        const { email, senha } = req.body;

        const resposta = await usuariosService.login(email, senha);

        return res.json(resposta);
    } catch (erro) {
        next(erro);
    }
}

module.exports = { cadastrar, login };