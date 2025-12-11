<?php
session_start();
require_once "db_connect.php";
require_once "log_functions.php"; // <<< ADICIONADO

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // GERAR SHA-256 DA SENHA DIGITADA
    $senha_hash = hash("sha256", $senha);

    // CONSULTA NA TABELA CLIENTES
    $sql = "SELECT * FROM clientes WHERE email = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {

        $usuario = $resultado->fetch_assoc();

        // VALIDAR A SENHA
        if ($senha_hash === $usuario['senha']) {

            // REGISTRA LOGIN BEM-SUCEDIDO
            registrarLog($conn, "LOGIN", "Login efetuado com sucesso", $usuario['id_clientes']);

            // SESSÕES
            $_SESSION['usuario_id']   = $usuario['id_clientes'];
            $_SESSION['usuario_nome'] = $usuario['nome_completo'];
            $_SESSION['usuario_tipo'] = $usuario['tipo_usuario'];

            // REDIRECIONAMENTO
            if ($usuario['tipo_usuario'] === 'ADMIN') {
                header("Location: admin/admin.php");
                exit;
            } else {
                header("Location: painel_cliente.php");
                exit;
            }

        } else {

            // REGISTRA TENTATIVA DE SENHA INCORRETA
            registrarLog($conn, "LOGIN_FALHOU", "Senha incorreta para o email: $email");

            echo "Senha incorreta!";
        }

    } else {
        // REGISTRA TENTATIVA COM EMAIL INEXISTENTE
        registrarLog($conn, "LOGIN_FALHOU", "Tentou fazer login com email inexistente: $email");

        echo "Usuário não encontrado!";
    }
}
?>
