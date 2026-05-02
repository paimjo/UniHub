-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 20, 2026 at 05:39 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unihub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--
CREATE DATABASE Unihub;

CREATE TABLE `admin` (
  `admin_id` bigint(20) NOT NULL,
  `uti_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `uti_id`) VALUES
(1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `candidatura`
--

CREATE TABLE `candidatura` (
  `cand_id` bigint(20) NOT NULL,
  `vaga_id` bigint(20) NOT NULL,
  `uti_id` bigint(20) NOT NULL,
  `data_candidatura` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('PENDENTE','ACEITE','REJEITADO') DEFAULT 'PENDENTE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidatura`
--

INSERT INTO `candidatura` (`cand_id`, `vaga_id`, `uti_id`, `data_candidatura`, `estado`) VALUES
(1, 1, 1, '2026-04-01 17:32:01', 'PENDENTE'),
(2, 1, 2, '2026-04-01 17:32:01', 'ACEITE'),
(3, 2, 3, '2026-04-01 17:32:01', 'PENDENTE'),
(6, 4, 1, '2026-04-02 10:00:00', 'PENDENTE'),
(7, 6, 4, '2026-04-02 11:00:00', 'PENDENTE'),
(8, 8, 5, '2026-04-02 12:00:00', 'ACEITE'),
(9, 11, 3, '2026-04-02 13:00:00', 'PENDENTE'),
(10, 7, 2, '2026-04-02 14:00:00', 'REJEITADO'),
(11, 12, 14, '2026-04-20 03:54:26', 'ACEITE');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chat_id` bigint(20) NOT NULL,
  `vaga_id` bigint(20) DEFAULT NULL,
  `remetente_id` bigint(20) DEFAULT NULL,
  `destinatario_id` bigint(20) DEFAULT NULL,
  `mensagem` text NOT NULL,
  `data_envio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`chat_id`, `vaga_id`, `remetente_id`, `destinatario_id`, `mensagem`, `data_envio`) VALUES
(1, 1, 1, 6, 'Olá, estou interessada na vaga de backend.', '2026-04-01 17:32:01'),
(2, 1, 6, 1, 'Olá Ana, pode enviar o seu CV atualizado?', '2026-04-01 17:32:01'),
(3, 2, 3, 6, 'Gostaria de saber mais sobre o estágio.', '2026-04-01 17:32:01'),
(4, 12, 15, 14, 'Ola Lurdes! Gostaríamos de agendar uma entrevista consigo. Tem disponibilidade esta semana?', '2026-04-20 04:30:03'),
(5, 12, 14, 15, 'Ola! Sim, tenho disponibilidade. Pode ser quarta-feira de manha?', '2026-04-20 04:34:03');

-- --------------------------------------------------------

--
-- Table structure for table `empresa`
--

CREATE TABLE `empresa` (
  `emp_id` bigint(20) NOT NULL,
  `uti_id` bigint(20) NOT NULL,
  `nome_empresa` varchar(150) DEFAULT NULL,
  `nif` varchar(50) DEFAULT NULL,
  `data_criacao` date DEFAULT NULL,
  `website` varchar(300) DEFAULT NULL,
  `contacto` varchar(20) DEFAULT NULL,
  `tipo` enum('EMPRESA','ONG') DEFAULT NULL,
  `localizacao` varchar(150) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `distrito` varchar(100) DEFAULT NULL,
  `morada` varchar(255) DEFAULT NULL,
  `codigo_postal` varchar(20) DEFAULT NULL,
  `responsavel_nome` varchar(120) DEFAULT NULL,
  `responsavel_email` varchar(180) DEFAULT NULL,
  `responsavel_contacto` varchar(20) DEFAULT NULL,
  `descricao` text,
  `logo_url` varchar(255) DEFAULT NULL,
  `aprovada` tinyint(1) NOT NULL DEFAULT '0',
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `empresa`
--

INSERT INTO `empresa` (`emp_id`, `uti_id`, `nome_empresa`, `nif`, `data_criacao`, `website`, `contacto`, `tipo`, `localizacao`, `pais`, `distrito`, `morada`, `codigo_postal`, `responsavel_nome`, `responsavel_email`, `responsavel_contacto`, `descricao`, `logo_url`, `aprovada`, `latitude`, `longitude`) VALUES
(1, 6, 'Tech Corp', '123456789', '2018-03-15', 'https://www.techcorp.pt', '213456789', 'EMPRESA', 'Lisboa', 'Portugal', 'Lisboa', 'Av. da Liberdade, 100', '1250-096', 'João Silva', 'joao.silva@techcorp.pt', '912345678', 'Empresa de tecnologia especializada em desenvolvimento de software e soluções digitais para empresas.', '/uploads/logos/techcorp.png', 1, '38.71667000', '-9.13333000'),
(3, 9, 'NexaTech Solutions', '512345678', '2019-09-10', 'https://www.nexatech.pt', '222987654', 'EMPRESA', 'Porto', 'Portugal', 'Porto', 'Rua das Flores, 200', '4050-262', 'Carlos Mendes', 'carlos.mendes@nexatech.pt', '933456789', 'Empresa de tecnologia focada em soluções digitais inovadoras para o mercado empresarial português.', '/uploads/logos/nexatech.png', 1, '41.14961000', '-8.61099000'),
(4, 15, 'TechCorp', '123456789', '2018-03-15', 'https://www.techcorp.pt', '213456789', 'EMPRESA', 'Lisboa', 'Portugal', 'Lisboa', 'Av. da Liberdade, 100', '1250-096', 'João Silva', 'joao@techcorp.pt', '912345678', 'Empresa de tecnologia especializada em desenvolvimento de software.', NULL, 0, '38.71667000', '-9.13333000');

-- --------------------------------------------------------

--
-- Table structure for table `favoritos`
--

CREATE TABLE `favoritos` (
  `fav_id` bigint(20) NOT NULL,
  `uti_id` bigint(20) NOT NULL,
  `vaga_id` bigint(20) NOT NULL,
  `data_guardado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `favoritos`
--

INSERT INTO `favoritos` (`fav_id`, `uti_id`, `vaga_id`, `data_guardado`) VALUES
(1, 1, 1, '2026-04-01 17:32:01'),
(2, 1, 2, '2026-04-01 17:32:01'),
(3, 2, 1, '2026-04-01 17:32:01'),
(5, 3, 2, '2026-04-01 17:32:01'),
(6, 3, 1, '2026-04-01 17:32:01'),
(15, 2, 4, '2026-04-01 17:32:01'),
(16, 4, 6, '2026-04-01 17:32:01'),
(17, 5, 8, '2026-04-01 17:32:01'),
(18, 5, 10, '2026-04-01 17:32:01'),
(19, 1, 5, '2026-04-01 17:32:01'),
(20, 3, 11, '2026-04-01 17:32:01'),
(21, 15, 12, '2026-04-20 04:06:23');

-- --------------------------------------------------------

--
-- Table structure for table `notificacao`
--

CREATE TABLE `notificacao` (
  `notif_id` bigint(20) NOT NULL,
  `uti_id` bigint(20) DEFAULT NULL,
  `mensagem` text,
  `tipo` varchar(50) NOT NULL DEFAULT 'GERAL',
  `lida` tinyint(1) DEFAULT '0',
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notificacao`
--

INSERT INTO `notificacao` (`notif_id`, `uti_id`, `mensagem`, `tipo`, `lida`, `criado_em`) VALUES
(1, 1, 'A sua candidatura foi submetida com sucesso.', 'GERAL', 1, '2026-04-16 10:07:45'),
(2, 2, 'Foi aceite na vaga de Programador Backend.', 'GERAL', 0, '2026-04-16 10:07:45'),
(3, 3, 'Nova mensagem recebida no chat.', 'GERAL', 0, '2026-04-16 10:07:45'),
(4, 5, 'Candidatura aceite para voluntariado.', 'GERAL', 1, '2026-04-16 10:07:45'),
(5, 4, 'Candidatura rejeitada.', 'GERAL', 0, '2026-04-16 10:07:45'),
(6, 1, 'A tua candidatura para Engenheiro de Software foi submetida.', 'CANDIDATURA', 0, '2026-04-16 12:59:05'),
(7, 4, 'A tua candidatura para Estágio em Marketing Digital foi submetida.', 'CANDIDATURA', 0, '2026-04-16 12:59:05'),
(8, 5, 'Foste aceite no Voluntariado em Educação Ambiental!', 'CANDIDATURA', 1, '2026-04-16 12:59:05'),
(9, 3, 'A tua candidatura para Estágio em Gestão de Projectos foi submetida.', 'CANDIDATURA', 0, '2026-04-16 12:59:05'),
(10, 2, 'A tua candidatura para Programador PHP não foi seleccionada.', 'CANDIDATURA', 0, '2026-04-16 12:59:05'),
(11, 14, 'A tua candidatura para \"Programador Backend Node.js\" foi submetida com sucesso.', 'CANDIDATURA', 0, '2026-04-20 03:54:26'),
(12, 14, 'Foste aceite na vaga \"Programador Backend Node.js\"!', 'CANDIDATURA', 0, '2026-04-20 03:59:30'),
(13, 14, 'TechCorp enviou-te uma mensagem.', 'MENSAGEM', 0, '2026-04-20 04:30:03'),
(14, 15, 'Lurdes enviou-te uma mensagem.', 'MENSAGEM', 0, '2026-04-20 04:34:03');

-- --------------------------------------------------------

--
-- Table structure for table `organizacao`
--

CREATE TABLE `organizacao` (
  `org_id` bigint(20) NOT NULL,
  `uti_id` bigint(20) NOT NULL,
  `nome` varchar(150) DEFAULT NULL,
  `nif` varchar(50) DEFAULT NULL,
  `data_criacao` date DEFAULT NULL,
  `website` varchar(300) DEFAULT NULL,
  `contacto` varchar(20) DEFAULT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `localizacao` varchar(150) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `distrito` varchar(100) DEFAULT NULL,
  `morada` varchar(255) DEFAULT NULL,
  `codigo_postal` varchar(20) DEFAULT NULL,
  `responsavel_nome` varchar(120) DEFAULT NULL,
  `responsavel_email` varchar(180) DEFAULT NULL,
  `responsavel_contacto` varchar(20) DEFAULT NULL,
  `descricao` text,
  `logo_url` varchar(255) DEFAULT NULL,
  `aprovada` tinyint(1) NOT NULL DEFAULT '0',
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `organizacao`
--

INSERT INTO `organizacao` (`org_id`, `uti_id`, `nome`, `nif`, `data_criacao`, `website`, `contacto`, `tipo`, `localizacao`, `pais`, `distrito`, `morada`, `codigo_postal`, `responsavel_nome`, `responsavel_email`, `responsavel_contacto`, `descricao`, `logo_url`, `aprovada`, `latitude`, `longitude`) VALUES
(1, 7, 'Green World ONG', '987654321', '2015-06-20', 'https://www.greenworld.pt', '222345678', 'Ambiental', 'Porto', 'Portugal', 'Porto', 'Rua de Santa Catarina, 50', '4000-447', 'Maria Costa', 'maria.costa@greenworld.pt', '923456789', 'Organização sem fins lucrativos dedicada à sustentabilidade ambiental e projectos de voluntariado ecológico.', '/uploads/logos/greenworld.png', 1, '41.14961000', '-8.61099000'),
(2, 10, 'Braga Solidária', '508123456', '2012-03-08', 'https://www.bragasolidaria.pt', '253456789', 'Social', 'Braga', 'Portugal', 'Braga', 'Praça da República, 25', '4700-320', 'António Ferreira', 'antonio.ferreira@bragasolidaria.pt', '913456789', 'Organização de solidariedade social que apoia famílias carenciadas e promove o voluntariado académico no norte de Portugal.', '/uploads/logos/bragasolidaria.png', 1, '41.55032000', '-8.42005000'),
(3, 16, 'Green World', '987654321', '2019-06-10', 'https://www.greenworld.pt', '214567890', 'ONG', 'Porto', 'Portugal', 'Porto', 'Rua das Flores, 50', '4050-262', 'Maria Santos', 'maria@greenworld.pt', '923456789', 'Organizacao dedicada a causas ambientais e sustentabilidade.', NULL, 0, '41.14961000', '-8.61099000');

-- --------------------------------------------------------

--
-- Table structure for table `perfil`
--

CREATE TABLE `perfil` (
  `perfil_id` bigint(20) NOT NULL,
  `uti_id` bigint(20) NOT NULL,
  `descricao` text,
  `genero` enum('MASCULINO','FEMININO') DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `nacionalidade` varchar(100) DEFAULT NULL,
  `numero_identificacao` varchar(30) DEFAULT NULL,
  `contacto` varchar(20) DEFAULT NULL,
  `morada` varchar(255) DEFAULT NULL,
  `instituicao_ensino` varchar(150) DEFAULT NULL,
  `curso` varchar(150) DEFAULT NULL,
  `licenciatura_concluida` tinyint(1) DEFAULT NULL,
  `data_prevista_conclusao` date DEFAULT NULL,
  `cv_url` varchar(255) DEFAULT NULL,
  `foto_url` varchar(255) DEFAULT NULL,
  `banner_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perfil`
--

INSERT INTO `perfil` (`perfil_id`, `uti_id`, `descricao`, `genero`, `data_nascimento`, `nacionalidade`, `numero_identificacao`, `contacto`, `morada`, `instituicao_ensino`, `curso`, `licenciatura_concluida`, `data_prevista_conclusao`, `cv_url`, `foto_url`, `banner_url`) VALUES
(1, 1, 'Estudante de Engenharia Informática com interesse em backend', 'FEMININO', '2002-03-15', 'Portuguesa', '12345678A', '912345678', 'Lisboa', 'Universidade Europeia', 'Engenharia Informática', 0, '2026-07-01', 'cv_ana.pdf', 'ana.jpg', '/uploads/banners/banner_ana.jpg'),
(2, 2, 'Gestor com experiência em startups', 'MASCULINO', '2001-07-22', 'Portuguesa', '23456789B', '923456789', 'Porto', 'Universidade do Porto', 'Gestão', 0, '2026-07-01', 'cv_bruno.pdf', 'bruno.jpg', '/uploads/banners/banner_bruno.jpg'),
(3, 3, 'Estudante de Direito focada em direito digital', 'FEMININO', '2002-11-05', 'Portuguesa', '34567890C', '934567890', 'Coimbra', 'Universidade de Coimbra', 'Direito', 0, '2027-07-01', 'cv_carla.pdf', 'carla.jpg', '/uploads/banners/banner_carla.jpg'),
(4, 4, 'Especialista em marketing digital', 'MASCULINO', '2001-05-18', 'Portuguesa', '45678901D', '945678901', 'Braga', 'Universidade do Minho', 'Marketing Digital', 0, '2026-12-01', 'cv_daniel.pdf', 'daniel.jpg', '/uploads/banners/banner_daniel.jpg'),
(5, 5, 'Investigadora em biologia ambiental', 'FEMININO', '2000-09-30', 'Portuguesa', '56789012E', '956789012', 'Aveiro', 'Universidade de Aveiro', 'Biologia Ambiental', 0, '2027-07-01', 'cv_eva.pdf', 'eva.jpg', '/uploads/banners/banner_eva.jpg'),
(6, 14, 'Estudante de Engenharia Informática', 'FEMININO', '2002-05-15', 'Portuguesa', '12345678', '912345678', 'Lisboa', 'IADE', 'Engenharia Informatica', 0, '2026-07-01', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `utilizador`
--

CREATE TABLE `utilizador` (
  `uti_id` bigint(20) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `tipo_email` enum('UNIVERSITARIO','PESSOAL','INSTITUCIONAL') NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT '1',
  `verificado` tinyint(1) DEFAULT '0',
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token_verificacao` varchar(255) DEFAULT NULL,
  `token_expira_em` datetime DEFAULT NULL,
  `tipo_utilizador` enum('ESTUDANTE','EMPRESA','ORGANIZACAO','ADMIN') NOT NULL DEFAULT 'ESTUDANTE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `utilizador`
--

INSERT INTO `utilizador` (`uti_id`, `nome`, `email`, `tipo_email`, `password`, `estado`, `verificado`, `criado_em`, `token_verificacao`, `token_expira_em`, `tipo_utilizador`) VALUES
(1, 'Luís', 'luis@iade.pt', 'UNIVERSITARIO', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-04-01 17:32:01', '24fe0176b9aa4b47c7304d08a1728b76', NULL, 'ESTUDANTE'),
(2, 'Bruno Martins', 'bruno@iade.pt', 'UNIVERSITARIO', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-04-01 17:32:01', '07773ee777eba0b3f981d720ad251caa', NULL, 'ESTUDANTE'),
(3, 'Carla Sousa', 'carla@iade.pt', 'UNIVERSITARIO', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 0, '2026-04-01 17:32:01', '16167df8b45165f7e126a385e922b7f9', NULL, 'ESTUDANTE'),
(4, 'Daniel Costa', 'daniel@iade.pt', 'UNIVERSITARIO', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-04-01 17:32:01', 'e52b5951e5061f21f25f61197ed3a8ef', NULL, 'ESTUDANTE'),
(5, 'Eva Santos', 'eva@iade.pt', 'UNIVERSITARIO', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-04-01 17:32:01', '7a9fdb79c0ecfe6f5bcf8a8d134cdb14', NULL, 'ESTUDANTE'),
(6, 'Tech Corp', 'tech@empresa.com', 'INSTITUCIONAL', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-04-01 17:32:01', '9c2ac262d6c664bc754e76e18e121c11', NULL, 'EMPRESA'),
(7, 'Green World', 'green@ong.com', 'INSTITUCIONAL', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-04-01 17:32:01', 'c2aec265b9825160177169750d1679e0', NULL, 'ORGANIZACAO'),
(8, 'Administrador', 'admin@unihub.com', 'PESSOAL', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-04-01 17:32:01', '2d1860ce5d1582841f8220dd566b1092', NULL, 'ADMIN'),
(9, 'NexaTech Solutions', 'info@nexatech.pt', 'INSTITUCIONAL', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-04-16 12:25:56', 'c5f3ac43ab7fec4f5e0c76d8d22d6724', NULL, 'EMPRESA'),
(10, 'Braga Solidária', 'geral@bragasolidaria.pt', 'INSTITUCIONAL', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-04-16 12:33:50', 'f622f354db7646aefd7bf839d8486c83', NULL, 'ORGANIZACAO'),
(11, 'Marlinda Da Conceição', 'marlinda@iade.pt', 'UNIVERSITARIO', '$2b$10$xPQ/U1WPfprQA3xuBU6osuPd5FNQ3w8gkW6QYCpHQK/wlcyqY.NrG', 1, 0, '2026-04-20 01:51:59', 'b8dfa75f4be8fb04240a8f767ce650bd54a065dd0cb4d29b119a563cb2ad4576', '2026-04-21 01:52:00', 'ESTUDANTE'),
(12, 'Marlinda Congo', 'marlinda2@iade.pt', 'UNIVERSITARIO', '$2b$10$nCLUSzZI0JKn8zTYap.ZvuWj8SHAX4NHBMiN6dXW/GJmswXxEzRcW', 1, 0, '2026-04-20 01:57:36', 'c3d9835f166cf80586f89e61d4cd4d87f6b54ef76a1f29e01456cf4749b2ec4e', '2026-04-21 01:57:37', 'ESTUDANTE'),
(13, 'Cássia Baptista', 'cassia@iade.pt', 'UNIVERSITARIO', '$2b$10$SIdmKZzk3K3mU5a4cQB4W.4x.pgS51EfhRBZ9lZJNOBQoW1MBOovC', 1, 0, '2026-04-20 01:58:29', '9f9e15c74ba67577b299ddc27bd0b8469037a6d069f236156a136f7f72edb2ed', '2026-04-21 01:58:30', 'ESTUDANTE'),
(14, 'Lurdes Silva', 'lurdes@iade.pt', 'UNIVERSITARIO', '$2b$10$9Q3k/BMt6HASHBQvEKs7VO1hgTLTzyuOqQvK0fA2yAQAC3gd36QVu', 1, 1, '2026-04-20 02:12:01', NULL, '2026-04-21 02:12:02', 'ESTUDANTE'),
(15, 'TechCorp', 'techcorp@techcorp.pt', 'INSTITUCIONAL', '$2b$10$L1FT.y/gDPzyEk.OyqAd0e237i9yhamwZo1.xLXsggqABt.lWRwSe', 1, 1, '2026-04-20 03:16:02', NULL, '2026-04-21 03:16:02', 'EMPRESA'),
(16, 'Green World', 'greenworld@greenworld.pt', 'INSTITUCIONAL', '$2b$10$81DsiPPZXbKVZn/n92V37uoTt6eE2ylaQSYhpfd8GpaZ3fq0e1ymC', 1, 1, '2026-04-20 03:30:50', NULL, '2026-04-21 03:30:50', 'ORGANIZACAO');

-- --------------------------------------------------------

--
-- Table structure for table `vaga`
--

CREATE TABLE `vaga` (
  `vaga_id` bigint(20) NOT NULL,
  `emp_id` bigint(20) DEFAULT NULL,
  `org_id` bigint(20) DEFAULT NULL,
  `titulo` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `remuneracao` varchar(100) DEFAULT NULL,
  `regime` enum('PRESENCIAL','REMOTO','HIBRIDO') NOT NULL DEFAULT 'PRESENCIAL',
  `competencias` text,
  `nivel_exigencia` enum('JUNIOR','MEDIO','SENIOR') DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `distrito` varchar(100) DEFAULT NULL,
  `pais` varchar(100) DEFAULT 'Portugal',
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `tipo` enum('EMPREGO','ESTAGIO','VOLUNTARIADO') DEFAULT NULL,
  `estado` enum('ABERTA','FECHADA') DEFAULT 'ABERTA',
  `data_publicacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vaga`
--

INSERT INTO `vaga` (`vaga_id`, `emp_id`, `org_id`, `titulo`, `descricao`, `remuneracao`, `regime`, `competencias`, `nivel_exigencia`, `cidade`, `distrito`, `pais`, `latitude`, `longitude`, `tipo`, `estado`, `data_publicacao`) VALUES
(1, 1, NULL, 'Programador Backend', 'Desenvolvimento de APIs em Java e integração com bases de dados', '1500€/mês', 'PRESENCIAL', 'Java, Spring Boot, APIs REST, MySQL, Git', 'JUNIOR', 'Lisboa', 'Lisboa', 'Portugal', '38.71667000', '-9.13333000', 'EMPREGO', 'ABERTA', '2026-04-01 17:32:01'),
(2, 1, NULL, 'Estágio Fullstack', 'Apoio no desenvolvimento frontend e backend', '800€/mês', 'PRESENCIAL', 'HTML, CSS, JavaScript, React, Node.js, MySQL', 'JUNIOR', 'Lisboa', 'Lisboa', 'Portugal', '38.71667000', '-9.13333000', 'ESTAGIO', 'ABERTA', '2026-04-01 17:32:01'),
(4, 1, NULL, 'Engenheiro de Software', 'Desenvolvimento e manutenção de sistemas de software empresarial. Trabalho em equipa ágil com metodologia Scrum.', '2000€/mês', 'HIBRIDO', 'Python, Django, PostgreSQL, Docker, Git', 'MEDIO', 'Lisboa', 'Lisboa', 'Portugal', '38.71667000', '-9.13333000', 'EMPREGO', 'ABERTA', '2026-04-16 12:38:11'),
(5, 1, NULL, 'Designer UI/UX', 'Criação de interfaces intuitivas e experiências de utilizador para aplicações web e mobile.', '1800€/mês', 'REMOTO', 'Figma, Adobe XD, Sketch, CSS, Prototipagem', 'MEDIO', 'Lisboa', 'Lisboa', 'Portugal', '38.71667000', '-9.13333000', 'EMPREGO', 'ABERTA', '2026-04-16 12:38:11'),
(6, 3, NULL, 'Estágio em Marketing Digital', 'Apoio à equipa de marketing na gestão de redes sociais, criação de conteúdo e análise de métricas digitais.', '700€/mês', 'PRESENCIAL', 'Google Analytics, SEO, Redes Sociais, Canva, Excel', 'JUNIOR', 'Porto', 'Porto', 'Portugal', '41.14961000', '-8.61099000', 'ESTAGIO', 'ABERTA', '2026-04-16 12:38:11'),
(7, 3, NULL, 'Programador PHP', 'Desenvolvimento de aplicações web em PHP com framework Laravel. Integração com bases de dados MySQL.', '1600€/mês', 'PRESENCIAL', 'PHP, Laravel, MySQL, HTML, CSS, JavaScript', 'JUNIOR', 'Porto', 'Porto', 'Portugal', '41.14961000', '-8.61099000', 'EMPREGO', 'ABERTA', '2026-04-16 12:38:11'),
(8, NULL, 1, 'Voluntário em Educação Ambiental', 'Apoio em actividades de sensibilização ambiental em escolas e comunidades locais do Porto.', 'Não remunerado', 'PRESENCIAL', 'Comunicação, Trabalho em equipa, Interesse em ambiente', NULL, 'Porto', 'Porto', 'Portugal', '41.14961000', '-8.61099000', 'VOLUNTARIADO', 'ABERTA', '2026-04-16 12:38:11'),
(9, NULL, 1, 'Voluntário em Gestão de Redes Sociais', 'Criação e gestão de conteúdo para as redes sociais da organização Green World.', 'Não remunerado', 'REMOTO', 'Instagram, Facebook, Canva, Copywriting', NULL, 'Porto', 'Porto', 'Portugal', '41.14961000', '-8.61099000', 'VOLUNTARIADO', 'ABERTA', '2026-04-16 12:38:11'),
(10, NULL, 2, 'Voluntário em Apoio Social', 'Apoio directo a famílias carenciadas na região de Braga. Distribuição de bens essenciais e acompanhamento social.', 'Não remunerado', 'PRESENCIAL', 'Empatia, Comunicação, Trabalho em equipa', NULL, 'Braga', 'Braga', 'Portugal', '41.55032000', '-8.42005000', 'VOLUNTARIADO', 'ABERTA', '2026-04-16 12:38:11'),
(11, NULL, 2, 'Estágio em Gestão de Projectos Sociais', 'Apoio na coordenação e gestão de projectos de solidariedade social na região do Minho.', '650€/mês', 'PRESENCIAL', 'Gestão de projectos, Excel, Word, Comunicação', 'JUNIOR', 'Braga', 'Braga', 'Portugal', '41.55032000', '-8.42005000', 'ESTAGIO', 'ABERTA', '2026-04-16 12:38:11'),
(12, 4, NULL, 'Programador Backend Node.js', 'Procuramos um programador backend com experiencia em Node.js e MySQL.', '1500€/mes', 'HIBRIDO', 'Node.js, MySQL, Express, REST API', 'JUNIOR', 'Lisboa', 'Lisboa', 'Portugal', '38.71667000', '-9.13333000', 'ESTAGIO', 'ABERTA', '2026-04-20 03:42:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `uti_id` (`uti_id`);

--
-- Indexes for table `candidatura`
--
ALTER TABLE `candidatura`
  ADD PRIMARY KEY (`cand_id`),
  ADD KEY `vaga_id` (`vaga_id`),
  ADD KEY `uti_id` (`uti_id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `vaga_id` (`vaga_id`),
  ADD KEY `remetente_id` (`remetente_id`),
  ADD KEY `destinatario_id` (`destinatario_id`);

--
-- Indexes for table `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`emp_id`),
  ADD KEY `uti_id` (`uti_id`);

--
-- Indexes for table `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`fav_id`),
  ADD UNIQUE KEY `uti_id` (`uti_id`,`vaga_id`),
  ADD KEY `vaga_id` (`vaga_id`);

--
-- Indexes for table `notificacao`
--
ALTER TABLE `notificacao`
  ADD PRIMARY KEY (`notif_id`),
  ADD KEY `uti_id` (`uti_id`);

--
-- Indexes for table `organizacao`
--
ALTER TABLE `organizacao`
  ADD PRIMARY KEY (`org_id`),
  ADD KEY `uti_id` (`uti_id`);

--
-- Indexes for table `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`perfil_id`),
  ADD KEY `uti_id` (`uti_id`);

--
-- Indexes for table `utilizador`
--
ALTER TABLE `utilizador`
  ADD PRIMARY KEY (`uti_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vaga`
--
ALTER TABLE `vaga`
  ADD PRIMARY KEY (`vaga_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `idx_cidade` (`cidade`),
  ADD KEY `idx_distrito` (`distrito`),
  ADD KEY `idx_tipo` (`tipo`),
  ADD KEY `idx_estado` (`estado`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidatura`
--
ALTER TABLE `candidatura`
  MODIFY `cand_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `empresa`
--
ALTER TABLE `empresa`
  MODIFY `emp_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `fav_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `notificacao`
--
ALTER TABLE `notificacao`
  MODIFY `notif_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `organizacao`
--
ALTER TABLE `organizacao`
  MODIFY `org_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `perfil`
--
ALTER TABLE `perfil`
  MODIFY `perfil_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `utilizador`
--
ALTER TABLE `utilizador`
  MODIFY `uti_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vaga`
--
ALTER TABLE `vaga`
  MODIFY `vaga_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`uti_id`) REFERENCES `utilizador` (`uti_id`) ON DELETE CASCADE;

--
-- Constraints for table `candidatura`
--
ALTER TABLE `candidatura`
  ADD CONSTRAINT `candidatura_ibfk_1` FOREIGN KEY (`vaga_id`) REFERENCES `vaga` (`vaga_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `candidatura_ibfk_2` FOREIGN KEY (`uti_id`) REFERENCES `utilizador` (`uti_id`) ON DELETE CASCADE;

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`vaga_id`) REFERENCES `vaga` (`vaga_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`remetente_id`) REFERENCES `utilizador` (`uti_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `chat_ibfk_3` FOREIGN KEY (`destinatario_id`) REFERENCES `utilizador` (`uti_id`) ON DELETE SET NULL;

--
-- Constraints for table `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`uti_id`) REFERENCES `utilizador` (`uti_id`) ON DELETE CASCADE;

--
-- Constraints for table `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`uti_id`) REFERENCES `utilizador` (`uti_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`vaga_id`) REFERENCES `vaga` (`vaga_id`) ON DELETE CASCADE;

--
-- Constraints for table `notificacao`
--
ALTER TABLE `notificacao`
  ADD CONSTRAINT `notificacao_ibfk_1` FOREIGN KEY (`uti_id`) REFERENCES `utilizador` (`uti_id`) ON DELETE CASCADE;

--
-- Constraints for table `organizacao`
--
ALTER TABLE `organizacao`
  ADD CONSTRAINT `organizacao_ibfk_1` FOREIGN KEY (`uti_id`) REFERENCES `utilizador` (`uti_id`) ON DELETE CASCADE;

--
-- Constraints for table `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `perfil_ibfk_1` FOREIGN KEY (`uti_id`) REFERENCES `utilizador` (`uti_id`) ON DELETE CASCADE;

--
-- Constraints for table `vaga`
--
ALTER TABLE `vaga`
  ADD CONSTRAINT `vaga_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `empresa` (`emp_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;