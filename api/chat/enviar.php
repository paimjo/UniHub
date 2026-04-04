<?php
include("../../config/database.php");

// Receber dados
$vaga_id = $_GET['vaga_id'];
$remetente_id = $_GET['remetente_id'];
$destinatario_id = $_GET['destinatario_id'];
$mensagem = $_GET['mensagem'];

// Query
$sql = "INSERT INTO chat (vaga_id, remetente_id, destinatario_id, mensagem)
        VALUES ($vaga_id, $remetente_id, $destinatario_id, '$mensagem')";

if ($conn->query($sql)) {
    echo "Mensagem enviada com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}
?>