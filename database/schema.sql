CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario_id INTEGER NOT NULL,
    CONSTRAINT fk_categoria_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    valor NUMERIC(10,2) NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    data DATE NOT NULL,
    categoria_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    CONSTRAINT tipo_transacao_valido
        CHECK (tipo IN ('receita', 'despesa')),
    CONSTRAINT fk_transacao_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id),
    CONSTRAINT fk_transacao_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);