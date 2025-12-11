document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  // Recupera o tema salvo
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    toggleButton.textContent = "☀️";
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    if (body.classList.contains("dark-theme")) {
      toggleButton.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      toggleButton.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
});

// tema login

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  // Aplica tema salvo
  if (localStorage.getItem("theme-login") === "dark") {
    body.classList.add("dark-theme-login");
    toggleButton.textContent = "☀️";
  }

  toggleButton.addEventListener("click", (e) => {
    e.preventDefault(); // evita reload por <a href="#">
    body.classList.toggle("dark-theme-login");

    if (body.classList.contains("dark-theme-login")) {
      toggleButton.textContent = "☀️";
      localStorage.setItem("theme-login", "dark");
    } else {
      toggleButton.textContent = "🌙";
      localStorage.setItem("theme-login", "light");
    }
  });
});

// tema cadastro

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  // Aplica tema salvo
  if (localStorage.getItem("theme-cadastro") === "dark") {
    body.classList.add("dark-theme-cadastro");
    toggleButton.textContent = "☀️";
  }

  toggleButton.addEventListener("click", (e) => {
    e.preventDefault(); // evitar reload
    body.classList.toggle("dark-theme-cadastro");

    if (body.classList.contains("dark-theme-cadastro")) {
      toggleButton.textContent = "☀️";
      localStorage.setItem("theme-cadastro", "dark");
    } else {
      toggleButton.textContent = "🌙";
      localStorage.setItem("theme-cadastro", "light");
    }
  });
});




// Aplicando máscaras nos campos
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-cadastro');

  if (form) {
    const msgError = document.getElementById('msgError');
    const msgSuccess = document.getElementById('msgSuccess');

    // Máscaras de campos (jQuery)
    $('#cpf').mask('000.000.000-00');
    $('#telefone').mask('(00) 0000-0000');
    $('#celular').mask('(00) 00000-0000');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      msgError.style.display = "none";
      msgSuccess.style.display = "none";
      let errors = [];

      const nome = document.getElementById('nome').value.trim();
      const usuario = document.getElementById('usuario').value.trim();
      const nomeMaterno = document.getElementById('nome-materno').value.trim();
      const cpf = document.getElementById('cpf').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const celular = document.getElementById('celular').value.trim();
      const endereco = document.getElementById('endereco').value.trim();
      const senha = document.getElementById('senha').value;
      const confirmaSenha = document.getElementById('confirmSenha').value;
      const dataNascimento = document.getElementById('data-nascimento').value;
      const sexo = document.getElementById('sexo').value;

      // Validação de campos obrigatórios e formatos
      if (nome.length < 3) errors.push("Nome deve ter pelo menos 3 caracteres.");

      if (!validarCPF(cpf) || /^(\d)\1{2}\.\1{3}\.\1{3}-\1{2}$/.test(cpf)) {
        errors.push("CPF inválido.");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("E-mail inválido.");
      }

      if (!/\(\d{2}\) \d{5}-\d{4}/.test(celular)) {
        errors.push("Celular inválido.");
      }

      if (!/\(\d{2}\) \d{4}-\d{4}/.test(telefone)) {
        errors.push("Telefone fixo inválido.");
      }

      if (!dataNascimento || isNaN(new Date(dataNascimento).getTime())) {
        errors.push("Data de nascimento inválida.");
      } else {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
          idade--;
        }
        if (idade < 18) {
          errors.push("Você deve ter pelo menos 18 anos para se cadastrar.");
        }
      }

      if (!sexo) {
        errors.push("Selecione o campo sexo.");
      }

      if (senha.length < 8) {
        errors.push("A senha deve ter no mínimo 8 caracteres.");
      }

      if (senha !== confirmaSenha) {
        errors.push("As senhas não conferem.");
      }

      if (errors.length > 0) {
        msgError.innerHTML = errors.join('<br>');
        msgError.style.display = "block";
      } else {
        msgSuccess.innerHTML = "Cadastro realizado com sucesso!";
        msgSuccess.style.display = "block";

        const dados = {
          nome,
          usuario,
          nomeMaterno,
          cpf,
          email,
          telefone,
          celular,
          endereco,
          dataNascimento,
          sexo,
          senha
        };

        localStorage.setItem('dadosFormulario', JSON.stringify(dados));
        alert("Cadastro realizado com sucesso!");
        window.location.href = 'login.html';
      }
    });
  }
});



  

  // Função de validação de CPF (com verificação matemática)
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  }






// mostra nome e controlar o menu usuario



// LOCALSTORAGE

// CADASTRO
//const formCadastro = document.querySelector('#form-cadastro');
//if (formCadastro) {
//  formCadastro.addEventListener('submit', function (e) {
//    e.preventDefault();

//    const nome = document.querySelector('#nome').value;
//    const email = document.querySelector('#email').value;
//    const senha = document.querySelector('#senha').value;

//    const usuario = { nome, email, senha };
//    localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));

//    alert('Cadastro realizado com sucesso!');
//    window.location.href = 'login.html';
//  });
//}




// tela inicial

// PAINEL
//const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

//if (document.body.classList.contains('painel-page')) {
//  if (!usuarioLogado) {
//    alert('Você precisa estar logado para acessar esta página.');
//    window.location.href = 'login.html';
//  } else {
//    document.getElementById('nome-usuario').textContent = usuarioLogado.nome;
//  }

//  const btnLogout = document.getElementById('logout');
//  if (btnLogout) {
//    btnLogout.addEventListener('click', () => {
//      localStorage.removeItem('usuarioLogado');
//      alert('Você saiu da sua conta.');
//      window.location.href = 'index.html';
//    });
//  }
//}

// Exibe nome do usuário logado no painel e permite logout
document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (document.body.classList.contains('painel-page')) {
    if (!usuarioLogado) {
      alert('Você precisa estar logado para acessar esta página.');
      window.location.href = 'login.html';
    } else {
      const nomeUsuarioSpan = document.getElementById('nome-usuario');
      if (nomeUsuarioSpan) {
        const nomeCompleto = usuarioLogado.nome.trim();
        const partes = nomeCompleto.split(' ');
        const nomeResumido = partes.length > 1
          ? `${partes[0]} ${partes[1]}`
          : partes[0];
        nomeUsuarioSpan.textContent = nomeResumido;
      }
    }

    const btnLogout = document.getElementById('logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuarioLogado');
        alert('Você saiu da sua conta.');
        window.location.href = 'index.html';
      });
    }
  }
});

