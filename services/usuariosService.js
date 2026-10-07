const usuariosModel = require("../models/usuariosModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function cadastrar(nome, email, senha) {
    const usuarioExistente = await usuariosModel.buscarPorEmail(email);

    if (usuarioExistente) {
        throw new Error("E-mail já cadastrado");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    return await usuariosModel.cadastrar(nome, email, senhaHash);
}

async function login(email, senha) {
    const usuario = await usuariosModel.buscarPorEmail(email);

    if (!usuario) {
        throw new Error("E-mail ou senha inválidos");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
        throw new Error("E-mail ou senha inválidos");
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token };
}

module.exports = { cadastrar, login };