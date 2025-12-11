<?php
require "../db_connect.php";
include "includes/header.php";

if (!isset($_GET['id']) || empty($_GET['id'])) {
    die("ID do usuário não informado.");
}

$id = $_GET['id'];

$stmt = $conn->prepare("SELECT * FROM clientes WHERE id_clientes = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die("Usuário não encontrado.");
}

$user = $result->fetch_assoc();
?>

<h1>Editar Usuário</h1>

<form method="post" action="salvar_edicao.php">
    <input type="hidden" name="id" value="<?= $user['id_clientes'] ?>">

    Nome:<br>
    <input type="text" name="nome" value="<?= htmlspecialchars($user['nome_completo']) ?>" required><br><br>

    Email:<br>
    <input type="email" name="email" value="<?= htmlspecialchars($user['email']) ?>" required><br><br>
    
    Endereço:<br>
        <input type="text" name="endereco" value="<?= htmlspecialchars($user['endereco']) ?>" required><br><br>


    Tipo:<br>
    <select name="tipo_usuario">
        <option value="CLIENTE" <?= $user['tipo_usuario']=="CLIENTE" ? "selected" : "" ?>>Cliente</option>
        <option value="ADMIN" <?= $user['tipo_usuario']=="ADMIN" ? "selected" : "" ?>>Admin</option>
    </select><br><br>

    <button class="button salvar">Salvar</button>
</form>

<?php include "includes/footer.php"; ?>
