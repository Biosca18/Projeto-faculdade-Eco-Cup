document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');
    if (!form) return;

    const msgError = document.getElementById('msgError');
    const msgSuccess = document.getElementById('msgSuccess');

    // Máscaras
    $('#cpf').mask('000.000.000-00');
    $('#telefone').mask('(00) 0000-0000');
    $('#celular').mask('(00) 00000-0000');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        msgError.style.display = "none";
        msgSuccess.style.display = "none";

        let errors = [];

        // Pegar valores
        const nome = form.nome.value.trim();
        const nomeMaterno = form['nome-materno'].value.trim();
        const cpf = form.cpf.value.trim();
        const email = form.email.value.trim();
        const telefone = form.telefone.value.trim();
        const celular = form.celular.value.trim();
        const endereco = form.endereco.value.trim();
        const senha = form.senha.value;
        const confirmaSenha = form.confirmSenha.value;
        const dataNascimento = form['data-nascimento'].value;
        const sexo = form.sexo.value;

        // Validações
        if (nome.length < 3) errors.push("Nome deve ter pelo menos 3 caracteres.");
        if (!validarCPF(cpf)) errors.push("CPF inválido.");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            errors.push("E-mail inválido.");

        if (!/\(\d{2}\) \d{5}-\d{4}/.test(celular))
            errors.push("Celular inválido.");

        if (!/\(\d{2}\) \d{4}-\d{4}/.test(telefone))
            errors.push("Telefone inválido.");

        // Data + idade
        if (!dataNascimento || isNaN(new Date(dataNascimento).getTime())) {
            errors.push("Data de nascimento inválida.");
        } else {
            const nasc = new Date(dataNascimento);
            const hoje = new Date();
            let idade = hoje.getFullYear() - nasc.getFullYear();
            const mes = hoje.getMonth() - nasc.getMonth();

            if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
                idade--;
            }
            if (idade < 18) errors.push("Você deve ter pelo menos 18 anos.");
        }

        if (!sexo) errors.push("Selecione o sexo.");
        if (senha.length < 8) errors.push("Senha deve ter no mínimo 8 caracteres.");
        if (senha !== confirmaSenha) errors.push("As senhas não conferem.");

        // Se houver erros
        if (errors.length > 0) {
            msgError.innerHTML = errors.join("<br>");
            msgError.style.display = "block";
            return;
        }

        // Salvar
        const dados = {
            nome,
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
        msgSuccess.innerHTML = "Cadastro realizado com sucesso!";
        msgSuccess.style.display = "block";

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1200);
    });
});
