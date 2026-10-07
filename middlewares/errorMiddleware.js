function tratarErros(erro, req, res, next) {
    console.error(erro);

    if (erro.message === "E-mail já cadastrado") {
        return res.status(400).json({ mensagem: erro.message });
    }

    if (erro.message === "E-mail ou senha inválidos") {
        return res.status(401).json({ mensagem: erro.message });
    }

    if (erro.message === "Categoria já cadastrada") {
        return res.status(400).json({ mensagem: erro.message });
    }

    if (erro.message === "Categoria não encontrada") {
        return res.status(404).json({ mensagem: erro.message });
    }

    if (erro.message === "Transação não encontrada") {
        return res.status(404).json({ mensagem: erro.message });
    }

    if (erro.code === "23505") {
        return res.status(400).json({ mensagem: "Registro já cadastrado" });
    }

    if (erro.code === "23503") {
        return res.status(400).json({ mensagem: "Registro relacionado não encontrado" });
    }

    return res.status(500).json({ mensagem: "Erro interno do servidor" });
}

module.exports = { tratarErros };