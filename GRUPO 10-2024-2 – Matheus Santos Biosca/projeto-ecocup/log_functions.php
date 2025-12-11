<?php
function registrarLog($conn, $tipo, $descricao, $idCliente = null) {
    $stmt = $conn->prepare("
        INSERT INTO log_eventos (fator_1_tipo, fator_2_descricao, clientes_id_clientes)
        VALUES (?, ?, ?)
    ");
    $stmt->bind_param("ssi", $tipo, $descricao, $idCliente);
    $stmt->execute();
}
