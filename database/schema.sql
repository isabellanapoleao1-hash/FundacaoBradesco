
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS fundacao_bradesco_cursos
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE fundacao_bradesco_cursos;

CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    data_cadastro DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao VARCHAR(500),
    carga_horaria INT NOT NULL,
    modalidade VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_categoria)
        REFERENCES categoria (id_categoria)
);

CREATE TABLE IF NOT EXISTS inscricao (
    id_inscricao INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_curso INT NOT NULL,
    data_inscricao DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Ativa',
    UNIQUE (id_aluno, id_curso),
    FOREIGN KEY (id_aluno)
        REFERENCES aluno (id_aluno),
    FOREIGN KEY (id_curso)
        REFERENCES curso (id_curso)
);
