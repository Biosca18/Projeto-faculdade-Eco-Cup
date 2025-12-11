<?php
require "../db_connect.php";

function registrar_log($msg) {
    global $conn;

    $stmt = $conn->prepare("INSERT INTO log_eventos (fator_1_tipo) VALUES (?)");
    $stmt->execute([$msg]);
}
