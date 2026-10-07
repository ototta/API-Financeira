const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não informado" });
    }

    const partes = authHeader.split(" ");

    if (partes.length !== 2) {
        return res.status(401).json({ mensagem: "Token inválido" });
    }

    const [bearer, token] = partes;

    if (bearer !== "Bearer") {
        return res.status(401).json({ mensagem: "Token inválido" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        next();
    } catch (erro) {
        return res.status(401).json({ mensagem: "Token inválido" });
    }
}

module.exports = { autenticar };