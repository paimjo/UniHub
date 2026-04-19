<?php
include("../../config/database.php");

$sql = "SELECT n.*, u.nome 
        FROM notificacao n
        JOIN utilizador u ON n.uti_id = u.uti_id";

$result = $conn->query($sql);

$data = [];

while($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>