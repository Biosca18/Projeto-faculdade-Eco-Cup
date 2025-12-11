<?php
require "../db_connect.php";
include "includes/header.php";

$busca = $_GET["busca"] ?? "";

$stmt = $conn->prepare("SELECT * FROM log_eventos 
                        WHERE fator_2_descricao LIKE ? 
                        ORDER BY timestamp_evento DESC");

$like = "%$busca%";
$stmt->bind_param("s", $like);
$stmt->execute();

$result = $stmt->get_result();
$logs = $result->fetch_all(MYSQLI_ASSOC);
?>

<h1>Logs do Sistema</h1>

<form>
    <input type="text" name="busca" placeholder="Filtrar logs..." value="<?= $busca ?>">
    <button class="button editar">Buscar</button>
</form>

<br>

<table>
    <tr>
        <th>ID</th>
        <th>Tipo</th>
        <th>Descrição</th>
        <th>Data/Hora</th>
        <th>ID do Cliente</th>
    </tr>

    <?php foreach ($logs as $log): ?>
        <tr>
            <td><?= $log['id_log'] ?></td>
            <td><?= $log['fator_1_tipo'] ?></td>
            <td><?= $log['fator_2_descricao'] ?></td>
            <td><?= $log['timestamp_evento'] ?></td>
            <td><?= $log['clientes_id_clientes'] ?></td>
        </tr>
    <?php endforeach; ?>
</table>

<?php include "includes/footer.php"; ?>
