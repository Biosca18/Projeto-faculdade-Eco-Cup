<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>

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

        <?php if (isset($_SESSION['id_cliente'])): ?>

            <li><a href="painel_cliente.php">Meu Painel</a></li>
            <li><a href="logout.php" style="color: red;">Sair</a></li>

        <?php else: ?>

            <li><a href="cadastro.php">Cadastre-se</a></li>
            <li><a href="login.php">Login</a></li>

        <?php endif; ?>
      </ul>
    </nav>

    <button id="theme-toggle" class="btn-toggle-theme">🌙</button>
  </div>
</header>
