1-Utlizador-Empresa
INSERT INTO utilizador (nome, email, tipo_email, curso, password, estado, verificado) VALUES
('Ana Ferreira','ana@email.com','UNIVERSITARIO','Engenharia Informática','$2b$hash1', TRUE,  TRUE),
('Bruno Martins','bruno@email.com','PESSOAL','Gestão','$2b$hash2',TRUE,TRUE),
('Carla Sousa','carla@email.com','UNIVERSITARIO','Direito','$2b$hash3', TRUE,FALSE),
('Daniel Costa','daniel@email.com','PESSOAL','Marketing','$2b$hash4', TRUE,TRUE),
('Eva Santos','eva@email.com','UNIVERSITARIO','Biologia','$2b$hash5',TRUE,TRUE),
-- Empresas / ONGs
('Tech Corp','tech@empresa.com','PESSOAL',NULL, '$2b$hash6',TRUE,TRUE),
('Green World','green@ong.com','PESSOAL', NULL, '$2b$hash7',TRUE,TRUE),
-- Admin
('Administrador','admin@unihub.com','PESSOAL',NULL,'$2b$hash8',TRUE,TRUE);

2-EMPRESAS
INSERT INTO empresa (uti_id, nome_empresa, nif, tipo, localizacao) VALUES
(6,'Tech Corp','123456789', 'EMPRESA','Lisboa'),
(7,'Green World','987654321','ONG','Porto');

3- Organização
INSERT INTO organizacao (uti_id, nome, tipo, localizacao) VALUES
(7,'Green World ONG','Ambiental','Porto');

4-Perfil
INSERT INTO perfil (uti_id, descricao, cv_ficheiro, foto)VALUES
(1, 'Estudante de Engenharia Informática com interesse em backend', 'cv_ana.pdf', 'ana.jpg'),
(2, 'Gestor com experiência em startups', 'cv_bruno.pdf', 'bruno.jpg'),
(3, 'Estudante de Direito focada em direito digital', 'cv_carla.pdf', 'carla.jpg'),
(4, 'Especialista em marketing digital', 'cv_daniel.pdf', 'daniel.jpg'),
(5, 'Investigadora em biologia ambiental', 'cv_eva.pdf', 'eva.jpg');

5-VAGAS
INSERT INTO vaga(emp_id, titulo, descricao, tipo,estado)VALUES
(1, 'Programador Backend',
 'Desenvolvimento de APIs em Java e integração com bases de dados',
 'EMPREGO', 'ABERTA'),
(1, 'Estágio Fullstack',
 'Apoio no desenvolvimento frontend e backend',
 'ESTAGIO', 'ABERTA'),
(2, 'Voluntariado Ambiental',
 'Ações de limpeza e sensibilização ambiental',
 'VOLUNTARIADO', 'ABERTA');

6-CANDIDATURAS
INSERT INTO candidatura(vaga_id, uti_id, estado)VALUES
(1, 1, 'PENDENTE'),
(1, 2, 'ACEITE'),
(2, 3, 'PENDENTE'),
(3, 5, 'ACEITE'),
(3, 4, 'REJEITADO');

7-CHAT
INSERT INTO chat(vaga_id, remetente_id, destinatario_id, mensagem)VALUES
(1, 1, 6, 'Olá, estou interessada na vaga de backend.'),
(1, 6, 1, 'Olá Ana, pode enviar o seu CV atualizado?'),
(2, 3, 6, 'Gostaria de saber mais sobre o estágio.'),
(3, 5, 7, 'Tenho interesse no voluntariado ambiental.');

8-NOTIFICAÇÕES
INSERT INTO notificacao (uti_id, mensagem, lida) VALUES
(1,'A sua candidatura foi submetida com sucesso.',TRUE),
(2,'Foi aceite na vaga de Programador Backend.',FALSE),
(3,'Nova mensagem recebida no chat.',FALSE),
(5,'Candidatura aceite para voluntariado.',TRUE),
(4,'Candidatura rejeitada.',FALSE);

9-ADM
INSERT INTO admin (uti_id) VALUES
(8);