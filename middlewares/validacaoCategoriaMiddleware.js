function validarCategoria(req, res, next) {
    const { nome } = req.body;

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({
            mensagem: "Nome da categoria é obrigatório"
        });
    }

    next();
}

module.exports = { validarCategoria };