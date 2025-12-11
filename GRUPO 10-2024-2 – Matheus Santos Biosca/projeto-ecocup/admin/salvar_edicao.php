<?php
require "../db_connect.php";

// Verificar se veio via POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Acesso inválido.");
}

// Validar campos obrigatórios
if (!isset($_POST['id'], $_POST['nome'], $_POST['email'], $_POST['tipo_usuario'])) {
    die("Dados incompletos.");
}

$id = $_POST['id'];
$nome = trim($_POST['nome']);
$email = trim($_POST['email']);
$tipo = trim($_POST['tipo_usuario']);

// Validar tipo_usuario (somente CLIENTE ou ADMIN)
if (!in_array($tipo, ['CLIENTE', 'ADMIN'])) {
    die("Tipo de usuário inválido.");
}

// Preparar UPDATE
$stmt = $conn->prepare("
    UPDATE clientes 
    SET 
        nome_completo = ?, 
        email = ?, 
        tipo_usuario = ?
    WHERE id_clientes = ?
");

$stmt->bind_param("sssi", $nome, $email, $tipo, $id);

if ($stmt->execute()) {
    // Redirecionar após sucesso
    header("Location: usuarios.php?ok=1");
    exit;
} else {
    die("Erro ao salvar: " . $stmt->error);
}
