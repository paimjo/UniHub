<?php
include("../../config/database.php");

// Receber dados (GET para testes)
$perfil_id = $_GET['perfil_id'];
$descricao = $_GET['descricao'];
$cv_ficheiro = $_GET['cv_ficheiro'];
$foto = $_GET['foto'];

// Query
$sql = "UPDATE perfil 
        SET descricao = '$descricao',
            cv_ficheiro = '$cv_ficheiro',
            foto = '$foto'
        WHERE perfil_id = $perfil_id";

if ($conn->query($sql)) {
    echo "Perfil atualizado com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}
?>