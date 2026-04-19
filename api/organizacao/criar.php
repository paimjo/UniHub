<?php
include("../../config/database.php");

// Receber dados (GET para testar no browser)
$uti_id = $_GET['uti_id'];
$nome = $_GET['nome'];
$tipo = $_GET['tipo'];
$localizacao = $_GET['localizacao'];

// Query
$sql = "INSERT INTO organizacao (uti_id, nome, tipo, localizacao)
        VALUES ($uti_id, '$nome', '$tipo', '$localizacao')";

if ($conn->query($sql)) {
    echo "Organização criada com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}
?>