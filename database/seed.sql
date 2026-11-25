
USE fundacao_bradesco_cursos;

INSERT INTO categoria (nome) VALUES
('Tecnologia'),
('Administração'),
('Desenvolvimento Pessoal'),
('Educação'),
('Informática Básica');

INSERT INTO aluno (nome, email, telefone, data_cadastro) VALUES
('Ana Souza', 'ana@example.com', '27999990001', '2026-11-24'),
('Pedro Lima', 'pedro@example.com', '27999990002', '2026-11-24'),
('Mariana Costa', 'mariana@example.com', '27999990003', '2026-11-24'),
('João Silva', 'joao.teste@example.com', '27999990004', '2026-11-24');

INSERT INTO curso
(id_categoria, nome, descricao, carga_horaria, modalidade)
VALUES
(1, 'Introdução à Informática', 'Conhecimentos básicos de informática.', 20, 'Online'),
(2, 'Fundamentos de Administração', 'Conceitos básicos de administração.', 30, 'Online'),
(3, 'Desenvolvimento Pessoal', 'Aprendizado sobre organização e desenvolvimento pessoal.', 15, 'Online'),
(4, 'Práticas Educacionais', 'Noções básicas de práticas educacionais.', 25, 'Online'),
(5, 'Informática Avançada', 'Conhecimentos avançados de informática.', 40, 'Online');

INSERT INTO inscricao
(id_aluno, id_curso, data_inscricao, status)
VALUES
(1, 1, '2026-11-24', 'Ativa'),
(2, 2, '2026-11-24', 'Ativa'),
(3, 3, '2026-11-24', 'Ativa'),
(1, 4, '2026-11-24', 'Ativa'),
(4, 5, '2026-11-24', 'Ativa');
