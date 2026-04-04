<?php
include("../../config/database.php");

// Receber dados (GET para testar no browser)
$emp_id = $_GET['emp_id'];
$titulo = $_GET['titulo'];
$descricao = $_GET['descricao'];
$tipo = $_GET['tipo'];

// Query
$sql = "INSERT INTO vaga (emp_id, titulo, descricao, tipo)
        VALUES ($emp_id, '$titulo', '$descricao', '$tipo')";

if ($conn->query($sql)) {
    echo "Vaga criada com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}
?>