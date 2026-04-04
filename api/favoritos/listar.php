<?php
include("../../config/database.php");

// Receber o ID do utilizador
$uti_id = $_GET['uti_id'];

$sql = "SELECT v.* 
        FROM favoritos f
        JOIN vaga v ON f.vaga_id = v.vaga_id
        WHERE f.uti_id = $uti_id";

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