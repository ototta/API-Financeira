const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "API Financeira",
            version: "1.0.0",
            description:
                "API REST para gerenciamento financeiro desenvolvida com Node.js, Express e PostgreSQL."
        },

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: [
        "./routes/usuariosRoutes.js",
        "./routes/categoriasRoutes.js",
        "./routes/transacoesRoutes.js",
        "./routes/relatorioRoutes.js"
    ]
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};