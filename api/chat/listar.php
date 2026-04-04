<?php
include("../../config/database.php");

// Pode filtrar por vaga (opcional)
$vaga_id = $_GET['vaga_id'];

$sql = "SELECT c.*, 
               u1.nome AS remetente_nome, 
               u2.nome AS destinatario_nome
        FROM chat c
        LEFT JOIN utilizador u1 ON c.remetente_id = u1.uti_id
        LEFT JOIN utilizador u2 ON c.destinatario_id = u2.uti_id
        WHERE c.vaga_id = $vaga_id
        ORDER BY c.data_envio ASC";

$result = $conn->query($sql);

$data = [];

if ($result) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} else {
    echo "Erro: " . $conn->error;
}
?>