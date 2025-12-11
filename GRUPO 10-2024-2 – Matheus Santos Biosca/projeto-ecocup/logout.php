<?php
session_start();
require_once "db_connect.php";
require_once "log_functions.php";

if (isset($_SESSION['usuario_id'])) {
    registrarLog($conn, "LOGOUT", "Usuário saiu da conta", $_SESSION['usuario_id']);
}

$_SESSION = [];
session_destroy();

header("Location: login.html");
exit();
