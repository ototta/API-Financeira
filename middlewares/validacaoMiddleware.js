function validarTransacao(req, res, next) {
    const { descricao, valor, tipo, data, categoriaId } = req.body;

    if (typeof descricao !== "string" || descricao.trim() === "") {
        return res.status(400).json({ mensagem: "Descrição é obrigatória" });
    }

    if (valor === undefined || valor === null || valor === "") {
        return res.status(400).json({ mensagem: "Valor é obrigatório" });
    }

    const valorNumerico = Number(valor);

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
        return res.status(400).json({
            mensagem: "Valor deve ser um número maior que zero"
        });
    }

    if (tipo !== "receita" && tipo !== "despesa") {
        return res.status(400).json({
            mensagem: "Tipo deve ser receita ou despesa"
        });
    }

    if (!data) {
        return res.status(400).json({ mensagem: "Data é obrigatória" });
    }

    const dataValida = /^\d{4}-\d{2}-\d{2}$/.test(data);

    if (!dataValida) {
        return res.status(400).json({
            mensagem: "Data deve estar no formato YYYY-MM-DD"
        });
    }

    const dataObj = new Date(`${data}T00:00:00`);

    if (
        Number.isNaN(dataObj.getTime()) ||
        dataObj.toISOString().slice(0, 10) !== data
    ) {
        return res.status(400).json({ mensagem: "Data inválida" });
    }

    const categoriaNumerica = Number(categoriaId);

    if (
        !categoriaId ||
        !Number.isInteger(categoriaNumerica) ||
        categoriaNumerica <= 0
    ) {
        return res.status(400).json({ mensagem: "Categoria inválida" });
    }

    next();
}

module.exports = { validarTransacao };