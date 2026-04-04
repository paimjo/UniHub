<?php

// Mostrar erros (remover em produção)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// JSON
header('Content-Type: application/json');

// BD
require_once __DIR__ . '/config/basededados.php';

// URL
$request = $_SERVER['REQUEST_URI'];
$request = strtok($request, '?');

// base do projeto
$base = '/unihub';
$request = str_replace($base, '', $request);

// ======================
// ROTAS
// ======================

// HOME
if ($request === '/' || $request === '') {
    echo json_encode([
        "status" => "ok",
        "mensagem" => "API UniHub ativa 🚀"
    ]);
}

// ======================
// UTILIZADOR
// ======================
elseif (strpos($request, '/api/utilizador/listar') !== false) {
    require __DIR__ . '/api/utilizador/listar.php';
}
elseif (strpos($request, '/api/utilizador/criar') !== false) {
    require __DIR__ . '/api/utilizador/criar.php';
}

// ======================
// EMPRESA
// ======================
elseif (strpos($request, '/api/empresa/listar') !== false) {
    require __DIR__ . '/api/empresa/listar.php';
}
elseif (strpos($request, '/api/empresa/criar') !== false) {
    require __DIR__ . '/api/empresa/criar.php';
}

// ======================
// CHAT
// ======================
elseif (strpos($request, '/api/chat/listar') !== false) {
    require __DIR__ . '/api/chat/listar.php';
}
elseif (strpos($request, '/api/chat/enviar') !== false) {
    require __DIR__ . '/api/chat/enviar.php';
}

// ======================
// FAVORITOS
// ======================
elseif (strpos($request, '/api/favoritos/listar') !== false) {
    require __DIR__ . '/api/favoritos/listar.php';
}
elseif (strpos($request, '/api/favoritos/adicionar') !== false) {
    require __DIR__ . '/api/favoritos/adicionar.php';
}
elseif (strpos($request, '/api/favoritos/remover') !== false) {
    require __DIR__ . '/api/favoritos/remover.php';
}

// ======================
// NOTIFICACOES
// ======================
elseif (strpos($request, '/api/notificacao/listar') !== false) {
    require __DIR__ . '/api/notificacao/listar.php';
}
elseif (strpos($request, '/api/notificacao/marcar_lida') !== false) {
    require __DIR__ . '/api/notificacao/marcar_lida.php';
}

// ======================
// CANDIDATURA
// ======================
elseif (strpos($request, '/api/candidatura/listar') !== false) {
    require __DIR__ . '/api/candidatura/listar.php';
}
elseif (strpos($request, '/api/candidatura/criar') !== false) {
    require __DIR__ . '/api/candidatura/criar.php';
}

// ======================
// VAGA
// ======================
elseif (strpos($request, '/api/vaga/listar') !== false) {
    require __DIR__ . '/api/vaga/listar.php';
}
elseif (strpos($request, '/api/vaga/criar') !== false) {
    require __DIR__ . '/api/vaga/criar.php';
}

// ======================
// PERFIL
// ======================
elseif (strpos($request, '/api/perfil') !== false) {
    require __DIR__ . '/api/perfil/perfil.php';
}

// ======================
// ORGANIZACAO
// ======================
elseif (strpos($request, '/api/organizacao/listar') !== false) {
    require __DIR__ . '/api/organizacao/listar.php';
}

// ======================
// ADMIN 🔥
// ======================
elseif (strpos($request, '/api/admin/listar') !== false) {
    require __DIR__ . '/api/admin/listar.php';
}
elseif (strpos($request, '/api/admin/utilizadores') !== false) {
    require __DIR__ . '/api/admin/utilizadores.php';
}
elseif (strpos($request, '/api/admin/empresas') !== false) {
    require __DIR__ . '/api/admin/empresas.php';
}
elseif (strpos($request, '/api/admin/candidaturas') !== false) {
    require __DIR__ . '/api/admin/candidaturas.php';
}

// ======================
// ERRO
// ======================
else {
    http_response_code(404);
    echo json_encode([
        "erro" => "Rota não encontrada",
        "rota" => $request
    ]);
}