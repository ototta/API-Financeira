const express = require("express");
const router = express.Router();

const transacoesController =
    require("../controllers/transacoesController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const validacaoMiddleware =
    require("../middlewares/validacaoMiddleware");

/**
 * @swagger
 * /transacoes:
 *   post:
 *     summary: Cadastra uma nova transação
 *     tags:
 *       - Transações
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *               - valor
 *               - tipo
 *               - data
 *               - categoriaId
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: Almoço
 *               valor:
 *                 type: number
 *                 format: double
 *                 example: 35.90
 *               tipo:
 *                 type: string
 *                 enum:
 *                   - receita
 *                   - despesa
 *                 example: despesa
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2026-10-06"
 *               categoriaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Transação cadastrada com sucesso
 *       400:
 *         description: Dados inválidos ou categoria não encontrada
 *       401:
 *         description: Token não informado ou inválido
 */
router.post(
    "/transacoes",
    authMiddleware.autenticar,
    validacaoMiddleware.validarTransacao,
    transacoesController.cadastrar
);

/**
 * @swagger
 * /transacoes:
 *   get:
 *     summary: Lista as transações do usuário
 *     tags:
 *       - Transações
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tipo
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - receita
 *             - despesa
 *         example: despesa
 *       - in: query
 *         name: categoriaId
 *         required: false
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: dataInicio
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-10-01"
 *       - in: query
 *         name: dataFim
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-10-31"
 *     responses:
 *       200:
 *         description: Lista de transações
 *       401:
 *         description: Token não informado ou inválido
 */
router.get(
    "/transacoes",
    authMiddleware.autenticar,
    transacoesController.listar
);

/**
 * @swagger
 * /transacoes/{id}:
 *   get:
 *     summary: Busca uma transação pelo ID
 *     tags:
 *       - Transações
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Transação encontrada
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Transação não encontrada
 */
router.get(
    "/transacoes/:id",
    authMiddleware.autenticar,
    transacoesController.buscarPorId
);

/**
 * @swagger
 * /transacoes/{id}:
 *   put:
 *     summary: Atualiza uma transação
 *     tags:
 *       - Transações
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *               - valor
 *               - tipo
 *               - data
 *               - categoriaId
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: Jantar
 *               valor:
 *                 type: number
 *                 format: double
 *                 example: 50.00
 *               tipo:
 *                 type: string
 *                 enum:
 *                   - receita
 *                   - despesa
 *                 example: despesa
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2026-10-06"
 *               categoriaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Transação atualizada com sucesso
 *       400:
 *         description: Dados inválidos ou categoria não encontrada
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Transação não encontrada
 */
router.put(
    "/transacoes/:id",
    authMiddleware.autenticar,
    validacaoMiddleware.validarTransacao,
    transacoesController.atualizar
);

/**
 * @swagger
 * /transacoes/{id}:
 *   delete:
 *     summary: Remove uma transação
 *     tags:
 *       - Transações
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Transação removida com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Transação não encontrada
 */
router.delete(
    "/transacoes/:id",
    authMiddleware.autenticar,
    transacoesController.remover
);

module.exports = router;