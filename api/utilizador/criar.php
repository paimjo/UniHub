<?php
include("../../config/database.php");

// Receber dados (GET para testar no browser)
$nome = $_GET['nome'];
$email = $_GET['email'];
$password = $_GET['password'];
$tipo_email = $_GET['tipo_email'];
$curso = $_GET['curso'];

// Query
$sql = "INSERT INTO utilizador (nome, email, tipo_email, curso, password)
        VALUES ('$nome', '$email', '$tipo_email', '$curso', '$password')";

if ($conn->query($sql)) {
    echo "Utilizador criado com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}
?>