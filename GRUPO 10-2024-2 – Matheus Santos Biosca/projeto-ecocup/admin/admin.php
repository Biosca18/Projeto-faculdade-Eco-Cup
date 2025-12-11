<?php
session_start();
require_once "../db_connect.php";
require_once "../log_functions.php";
require_once "includes/proteger_admin.php";

// Registrar acesso ao painel administrativo
registrarLog($conn, "ACESSO_ADMIN", "Administrador acessou o painel", $_SESSION['usuario_id']);

include "includes/header.php";
?>

<h1>Dashboard do Administrador</h1>

<nav class="menu-admin">
    <ul>
        <li><a href="usuarios.php">Gerenciar Usuários</a></li>
        <li><a href="logs.php">Ver Logs</a></li>
        <li><a href="../logout.php">Sair</a></li>
    </ul>
</nav>

<p>Selecione uma opção no menu acima.</p>

<?php include "includes/footer.php"; ?>
