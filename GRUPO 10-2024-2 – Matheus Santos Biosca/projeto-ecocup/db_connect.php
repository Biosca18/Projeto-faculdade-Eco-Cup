<?php
$host = "localhost";
$usuario = "root";        // padrão do XAMPP
$senha = "";              // senha vazia no XAMPP
$banco = "mydb";          // o nome do seu banco

$conn = new mysqli($host, $usuario, $senha, $banco);

// Verifica conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}
?>
