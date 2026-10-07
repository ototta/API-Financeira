# API Financeira

API REST para gerenciamento financeiro pessoal, desenvolvida com Node.js, Express e PostgreSQL.

O projeto permite cadastrar usuários, categorias e transações financeiras, além de consultar relatórios de receitas, despesas e saldo.

## Tecnologias

- Node.js
- JavaScript
- Express
- PostgreSQL
- SQL
- JWT
- bcrypt
- Swagger
- Git

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Criptografia de senhas com bcrypt
- CRUD de categorias
- CRUD de transações
- Filtros de transações por:
  - tipo
  - categoria
  - período
- Relatório de receitas, despesas e saldo
- Relatório de despesas por categoria
- Validação de dados
- Tratamento centralizado de erros
- Controle de acesso aos dados por usuário
- Documentação da API com Swagger

## Arquitetura

O projeto utiliza uma arquitetura em camadas:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
PostgreSQL