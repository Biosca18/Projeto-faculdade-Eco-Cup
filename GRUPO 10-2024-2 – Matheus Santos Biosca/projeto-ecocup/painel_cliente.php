<?php
session_start();
require_once "db_connect.php";
require_once "log_functions.php"; // <<< ADICIONADO

// Se não estiver logado, redireciona
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

// Buscar dados completos do usuário (corrige o problema do email)
$sql = "SELECT nome_completo, email FROM clientes WHERE id_clientes = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();
$cliente = $result->fetch_assoc();

$nome = $cliente['nome_completo'];
$email = $cliente['email'];

// Registrar o acesso ao painel
registrarLog($conn, "ACESSO_CLIENTE", "Acessou o painel do cliente", $usuario_id);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Painel do Cliente - EcoCup</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- HEADER IGUAL AO DO SITE -->
  <header class="header">
    <div class="container header-content">
      <div class="logo">
        <img src="assets/imgs/logoEcoCup.png" alt="logo">
      </div>

      <nav class="menu">
        <ul>
          <li><a href="index.php">Início</a></li>
          <li><a href="produtos.php">Produtos</a></li>
          <li><a href="quem-somos.php">Quem Somos</a></li>

          <!-- LINKS ALTERADOS PARA USUÁRIO LOGADO -->
          <li><a href="painel_cliente.php">Meu Painel</a></li>
          <li><a href="logout.php" style="color: red;">Sair</a></li>
        </ul>
      </nav>

      <button id="theme-toggle" class="btn-toggle-theme">🌙</button>
    </div>
  </header>

  <main class="container" style="padding: 40px 0;">
    <h1>Bem-vindo, <?= htmlspecialchars($nome) ?> 👋</h1>

    <section class="painel-box">
      <h2>Seus dados</h2>
      <p><strong>Nome:</strong> <?= htmlspecialchars($nome) ?></p>
      <p><strong>Email:</strong> <?= htmlspecialchars($email) ?></p>

      <br>

      <a href="logout.php" class="btn" style="background: #f44336;">Sair da Conta</a>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 EcoCup Unisuam - Todos os direitos reservados.</p>
    </div>
  </footer>

</body>
</html>
