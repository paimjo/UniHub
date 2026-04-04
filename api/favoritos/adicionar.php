<?php
include("../../config/database.php");

// Receber dados
$uti_id = $_GET['uti_id'];
$vaga_id = $_GET['vaga_id'];

// Query
$sql = "INSERT INTO favoritos (uti_id, vaga_id)
        VALUES ($uti_id, $vaga_id)";

if ($conn->query($sql)) {
    echo "Favorito adicionado com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}
?>