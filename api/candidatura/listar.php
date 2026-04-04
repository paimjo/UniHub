<?php
include("../../config/database.php");

// Pode filtrar por utilizador (opcional)
$uti_id = $_GET['uti_id'];

$sql = "SELECT c.*, 
               v.titulo AS vaga_titulo,
               u.nome AS utilizador_nome
        FROM candidatura c
        JOIN vaga v ON c.vaga_id = v.vaga_id
        JOIN utilizador u ON c.uti_id = u.uti_id
        WHERE c.uti_id = $uti_id
        ORDER BY c.data_candidatura DESC";

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