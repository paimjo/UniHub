<?php
include("../../config/database.php");

// Receber dados (GET para testar)
$uti_id = $_GET['uti_id'];
$nome_empresa = $_GET['nome_empresa'];
$nif = $_GET['nif'];
$tipo = $_GET['tipo'];
$localizacao = $_GET['localizacao'];

// Query
$sql = "INSERT INTO empresa (uti_id, nome_empresa, nif, tipo, localizacao)
        VALUES ($uti_id, '$nome_empresa', '$nif', '$tipo', '$localizacao')";

if ($conn->query($sql)) {
    echo "Empresa criada com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}
?>