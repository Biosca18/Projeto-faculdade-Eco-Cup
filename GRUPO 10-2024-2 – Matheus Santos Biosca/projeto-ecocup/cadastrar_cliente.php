<?php
require "db_connect.php";
require_once "log_functions.php"; // <<< ADICIONADO
date_default_timezone_set('America/Sao_Paulo');

// Verifica se veio por POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: cadastro.html");
    exit;
}

// RECEBE CAMPOS DO FORMULÁRIO
$nome_completo      = $_POST['nome_completo'];
$login              = $_POST['login'];
$nome_materno       = $_POST['nome_materno'];
$email              = $_POST['email'];
$cpf                = preg_replace('/\D/', '', $_POST['cpf']);
$data_nascimento    = $_POST['data_nascimento'];
$sexo               = $_POST['sexo'];
$telefone_celular   = $_POST['telefone_celular'];
$cep                = $_POST['cep'];
$rua                = $_POST['rua'];
$numero             = $_POST['numero'];
$bairro             = $_POST['bairro'];
$cidade             = $_POST['cidade'];
$uf                 = strtoupper($_POST['uf']);
$senha              = $_POST['senha'];
$confirmSenha       = $_POST['confirmSenha'];
$tipo_usuario       = "CLIENTE";

// VALIDA SENHAS
if ($senha !== $confirmSenha) {
    registrarLog($conn, "CADASTRO_FALHOU", "Senha e Confirmar Senha não conferem (email: $email)");
    echo "<script>alert('As senhas não conferem!'); history.back();</script>";
    exit;
}

// Cria ENDEREÇO completo
$endereco = "$rua, $numero - $bairro, $cidade - $uf";

// Verificar se email, login ou CPF já estão cadastrados
$stmt = $conn->prepare("SELECT id_clientes FROM clientes WHERE email = ? OR cpf = ? OR login = ?");
$stmt->bind_param("sss", $email, $cpf, $login);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    registrarLog($conn, "CADASTRO_FALHOU", "Email, CPF ou Login já cadastrados (email: $email)");
    echo "<script>alert('Email, CPF ou Login já cadastrados!'); history.back();</script>";
    exit;
}

$stmt->close();

// Criptografa a senha
$senha_hash = hash("sha256", $senha);

// Prepara INSERT
$stmt = $conn->prepare("
    INSERT INTO clientes 
    (nome_completo, email, senha, endereco, cep, data_cadastro, data_nascimento, sexo, nome_materno, cpf, telefone_celular, login, tipo_usuario) 
    VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssssssss",
    $nome_completo,
    $email,
    $senha_hash,
    $endereco,
    $cep,
    $data_nascimento,
    $sexo,
    $nome_materno,
    $cpf,
    $telefone_celular,
    $login,
    $tipo_usuario
);

if ($stmt->execute()) {

    // ÚLTIMO ID CADASTRADO
    $novo_id = $conn->insert_id;

    registrarLog($conn, "CADASTRO_SUCESSO", "Novo cliente cadastrado com email: $email", $novo_id);

    echo "<script>alert('Cadastro realizado com sucesso!'); window.location='login.html';</script>";

} else {
    registrarLog($conn, "CADASTRO_FALHOU", "Erro ao cadastrar cliente (email: $email) - MySQL: {$stmt->error}");
    echo "Erro ao cadastrar: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
