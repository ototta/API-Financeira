const express = require("express");
const router = express.Router();

const categoriasController =
    require("../controllers/categoriasController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const validacaoCategoriaMiddleware =
    require("../middlewares/validacaoCategoriaMiddleware");

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista as categorias do usuário
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       401:
 *         description: Token não informado ou inválido
 */
router.get(
    "/categorias",
    authMiddleware.autenticar,
    categoriasController.listar
);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cadastra uma nova categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Alimentação
 *     responses:
 *       201:
 *         description: Categoria cadastrada com sucesso
 *       400:
 *         description: Nome inválido ou categoria já cadastrada
 *       401:
 *         description: Token não informado ou inválido
 */
router.post(
    "/categorias",
    authMiddleware.autenticar,
    validacaoCategoriaMiddleware.validarCategoria,
    categoriasController.cadastrar
);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Busca uma categoria pelo ID
 *     tags:
 *       - Categorias
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
 *         description: Categoria encontrada
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Categoria não encontrada
 */
router.get(
    "/categorias/:id",
    authMiddleware.autenticar,
    categoriasController.buscarPorId
);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags:
 *       - Categorias
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
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Lazer
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Nome inválido ou categoria já cadastrada
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Categoria não encontrada
 */
router.put(
    "/categorias/:id",
    authMiddleware.autenticar,
    validacaoCategoriaMiddleware.validarCategoria,
    categoriasController.atualizar
);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags:
 *       - Categorias
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
 *         description: Categoria removida com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Categoria não encontrada
 */
router.delete(
    "/categorias/:id",
    authMiddleware.autenticar,
    categoriasController.remover
);

module.exports = router;