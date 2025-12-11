<?php
session_start();
require_once "../db_connect.php";
require_once "../log_functions.php";
require_once "includes/proteger_admin.php";  // proteção para admin

// Registrar acesso à página de usuários
registrarLog($conn, "ACESSO_ADMIN", "Administrador acessou a página de usuários", $_SESSION['usuario_id']);

$stmt = $conn->prepare("SELECT * FROM clientes ORDER BY nome_completo ASC");
$stmt->execute();

$result = $stmt->get_result();
$usuarios = $result->fetch_all(MYSQLI_ASSOC);

include "includes/header.php";
?>

<h1>Usuários</h1>

<table>
    <tr>
        <th>ID</th><th>Nome</th><th>Email</th><th>Tipo</th><th>Ações</th>
    </tr>

    <?php foreach ($usuarios as $u): ?>
        <tr>
            <td><?= $u['id_clientes'] ?></td>
            <td><?= htmlspecialchars($u['nome_completo']) ?></td>
            <td><?= htmlspecialchars($u['email']) ?></td>
            <td><?= htmlspecialchars($u['tipo_usuario']) ?></td>
            <td>
                <a class="button editar" href="editar_usuario.php?id=<?= $u['id_clientes'] ?>">Editar</a>

                <a class="button excluir"
                   href="excluir_usuario.php?id=<?= $u['id_clientes'] ?>"
                   onclick="return confirm('Tem certeza que deseja excluir?')">
                    Excluir
                </a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>

<?php include "includes/footer.php"; ?>
