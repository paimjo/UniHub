<?php
include("../../config/database.php");

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM utilizador WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $user = $result->fetch_assoc();

    if ($password == $user['password']) {
        echo json_encode([
            "status" => "sucesso",
            "user" => $user
        ]);
    } else {
        echo json_encode([
            "status" => "erro",
            "mensagem" => "Senha incorreta"
        ]);
    }

} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Utilizador não encontrado"
    ]);
}
?>