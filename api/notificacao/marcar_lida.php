<?php
include("../../config/database.php");

$notif_id = $_GET['notif_id'];

$sql = "UPDATE notificacao 
        SET lida = 1
        WHERE notif_id = $notif_id";

if ($conn->query($sql)) {
    echo json_encode(["status" => "sucesso"]);
} else {
    echo json_encode(["status" => "erro"]);
}
?>