<?php
include("../../config/database.php");

$sql = "SELECT o.*, u.nome 
        FROM organizacao o
        JOIN utilizador u ON o.uti_id = u.uti_id";

$result = $conn->query($sql);

$data = [];

while($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>