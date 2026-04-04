<?php
include("../../config/database.php");

$uti_id = $_GET['uti_id'];
$vaga_id = $_GET['vaga_id'];

$sql = "DELETE FROM favoritos 
        WHERE uti_id = $uti_id AND vaga_id = $vaga_id";

if ($conn->query($sql)) {
    echo json_encode(["status" => "sucesso"]);
} else {
    echo json_encode(["status" => "erro"]);
}
?>