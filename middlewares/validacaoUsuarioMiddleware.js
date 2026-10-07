function validarUsuario(req, res, next) {
    const { nome, email, senha } = req.body;

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ mensagem: "Nome é obrigatório" });
    }

    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ mensagem: "E-mail é obrigatório" });
    }

    if (!email.includes("@")) {
        return res.status(400).json({ mensagem: "E-mail inválido" });
    }

    if (typeof senha !== "string" || senha.length < 6) {
        return res.status(400).json({
            mensagem: "Senha deve ter pelo menos 6 caracteres"
        });
    }

    next();
}

module.exports = { validarUsuario };