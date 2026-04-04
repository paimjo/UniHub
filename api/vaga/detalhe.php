<?php
include("../../config/database.php");

$vaga_id = $_GET['vaga_id'];

$sql = "SELECT v.*, e.nome_empresa 
        FROM vaga v
        JOIN empresa e ON v.emp_id = e.emp_id
        WHERE v.vaga_id = $vaga_id";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["mensagem" => "Vaga não encontrada"]);
}
?>