<?php
session_start();

if (!isset($_SESSION['id']) || $_SESSION['tipo_usuario'] !== 'ADMIN') {
    die("Acesso negado!");
}
?>

<h1>Bem-vindo, Admin <?= $_SESSION['nome'] ?></h1>