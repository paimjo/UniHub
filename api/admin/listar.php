<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

<?php
include("../../config/database.php");

$sql = "SELECT a.admin_id, u.nome, u.email
        FROM admin a
        JOIN utilizador u ON a.uti_id = u.uti_id";

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