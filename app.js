const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const { swaggerUi, specs } = require("./swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const usuariosRoutes = require("./routes/usuariosRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const transacoesRoutes = require("./routes/transacoesRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");

app.use(usuariosRoutes);
app.use(categoriasRoutes);
app.use(transacoesRoutes);
app.use(relatorioRoutes);

const { tratarErros } = require("./middlewares/errorMiddleware");

app.use(tratarErros);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});