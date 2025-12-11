<?php
session_start();
require "../db_connect.php";
require "registrar_log.php";

// Verifica se recebeu o ID
if (!isset($_GET["id"]) || !is_numeric($_GET["id"])) {
    die("ID inválido.");
}

$id = intval($_GET["id"]);

// Prepara o DELETE corretamente
$stmt = $conn->prepare("DELETE FROM clientes WHERE id_clientes = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    
    registrar_log("Admin ID {$_SESSION['usuario_id']} excluiu o usuário ID $id");

    header("Location: usuarios.php?msg=excluido");
    exit();

} else {
    die("Erro ao excluir usuário: " . $stmt->error);
}
