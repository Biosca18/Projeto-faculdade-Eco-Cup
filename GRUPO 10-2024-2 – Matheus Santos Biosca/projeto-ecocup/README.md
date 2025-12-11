# projeto-faculdade-ecocup

📌 README – Sistema de Gerenciamento de Usuários (Admin Panel)

Este projeto é um Painel Administrativo desenvolvido em PHP com MySQL, permitindo que administradores gerenciem clientes, editem cadastros, excluam usuários e consultem logs de operações.
O sistema também faz registro automático de eventos para auditoria (logs), possui autenticação e está preparado para implementação de 2FA.

🔧 Tecnologias Utilizadas

PHP 8+

MySQL (MariaDB / XAMPP / Workbench)

HTML5 / CSS3

Bootstrap (opcional)

JavaScript

Sessões com PHP



📂 Estrutura de Pastas
/admin
    editar_usuario.php
    excluir_usuario.php
    usuarios.php
    logs.php
    registrar_log.php
    includes/
        proteger_admin.php
        header.php
        footer.php
/db_connect.php
/login.php
/logout.php

🧱 Banco de Dados
Tabela: clientes
id_clientes INT PRIMARY KEY AUTO_INCREMENT,
nome_completo VARCHAR(200),
email VARCHAR(100),
senha VARCHAR(255),
endereco VARCHAR(255),
data_cadastro DATETIME,
data_nascimento DATE,
sexo VARCHAR(15),
nome_materno VARCHAR(200),
cpf VARCHAR(11),
telefone_celular VARCHAR(15),
login VARCHAR(50),
tipo_usuario ENUM('CLIENTE','ADMIN')

Tabela: log_eventos
id_log INT PRIMARY KEY AUTO_INCREMENT,
timestamp_evento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fator_1_tipo VARCHAR(100),
fator_2_descricao VARCHAR(255),
clientes_id_clientes INT

🧰 Funcionalidades Principais
✔ 1. Gerenciamento de Usuários (CRUD)

Admins podem:

Listar todos os clientes

Editar dados do usuário

Excluir usuários

Visualizar tipo (CLIENTE / ADMIN)

✔ 2. Registro Automático de Logs

Toda ação administrativa gera um log:

Exclusão de usuário

Edição

Tentativas inválidas

Login / Logout (opcional)

O registro é feito via arquivo:

registrar_log.php

✔ 3. Autenticação

O sistema utiliza sessões para manter o administrador logado.

session_start();
$_SESSION['usuario_id']

✔ 4. Preparado para 2FA

Ferramentas prontas para:

código enviado por e-mail

perguntas secretas

token numérico

log detalhado de validação

📎 Arquivos Importantes
usuarios.php

Lista todos os clientes cadastrados.

editar_usuario.php

Carrega dados do cliente e permite edição.

excluir_usuario.php

Realiza a exclusão com segurança e log.

logs.php

Lista todos os registros do sistema.

registrar_log.php

Função central de auditoria.

🛡️ Segurança Implementada

Verificação de sessão antes de acessar páginas restritas

Validação de IDs

Prepared Statements para evitar SQL Injection

Logs de operações administrativas

Possibilidade de adicionar 2FA

▶️ Como Rodar o Projeto
1. Clone o repositório
git clone https://github.com/ptkribeiro02/projeto-faculdade-ecocup.git

2. Importe o banco

Abra o MySQL Workbench ou phpMyAdmin

Importe o arquivo mydb.sql

3. Configure a conexão

Edite o arquivo:

/db_connect.php


Insira suas credenciais:

$host = "localhost";
$user = "root";
$pass = "";
$db   = "mydb";

4. Inicie o servidor

Usando XAMPP:

Apache: ON

MySQL: ON

Acesse:

http://localhost/nome-do-projeto/