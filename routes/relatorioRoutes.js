const express = require("express");
const router = express.Router();

const relatorioController =
    require("../controllers/relatorioController");

const authMiddleware =
    require("../middlewares/authMiddleware");

/**
 * @swagger
 * /relatorio/resumo:
 *   get:
 *     summary: Retorna o resumo financeiro do usuário
 *     tags:
 *       - Relatórios
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Resumo financeiro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 receitas:
 *                   type: number
 *                   example: 2500
 *                 despesas:
 *                   type: number
 *                   example: 35.90
 *                 saldo:
 *                   type: number
 *                   example: 2464.10
 *       401:
 *         description: Token não informado ou inválido
 */
router.get(
    "/relatorio/resumo",
    authMiddleware.autenticar,
    relatorioController.resumo
);

/**
 * @swagger
 * /relatorio/categorias:
 *   get:
 *     summary: Retorna o total de despesas por categoria
 *     tags:
 *       - Relatórios
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Total de despesas agrupadas por categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoriaId:
 *                     type: integer
 *                     example: 1
 *                   categoria:
 *                     type: string
 *                     example: Alimentação
 *                   total:
 *                     type: number
 *                     example: 35.90
 *       401:
 *         description: Token não informado ou inválido
 */
router.get(
    "/relatorio/categorias",
    authMiddleware.autenticar,
    relatorioController.resumoPorCategoria
);

module.exports = router;