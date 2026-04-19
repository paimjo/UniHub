<?php
include("../../config/database.php");

// Receber dados
$vaga_id = $_GET['vaga_id'];
$uti_id = $_GET['uti_id'];

// Query
$sql = "INSERT INTO candidatura (vaga_id, uti_id)
        VALUES ($vaga_id, $uti_id)";

if ($conn->query($sql)) {
    echo "Candidatura enviada com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}
?>