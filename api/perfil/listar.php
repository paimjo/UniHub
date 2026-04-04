<?php
include("../../config/database.php");

$sql = "SELECT * FROM perfil";
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