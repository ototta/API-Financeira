const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");
const validacaoUsuarioMiddleware =
    require("../middlewares/validacaoUsuarioMiddleware");

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Joao
 *               email:
 *                 type: string
 *                 example: joao@teste.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou e-mail já cadastrado
 */
router.post(
    "/usuarios",
    validacaoUsuarioMiddleware.validarUsuario,
    usuariosController.cadastrar
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@teste.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: E-mail ou senha inválidos
 */
router.post("/login", usuariosController.login);

module.exports = router;