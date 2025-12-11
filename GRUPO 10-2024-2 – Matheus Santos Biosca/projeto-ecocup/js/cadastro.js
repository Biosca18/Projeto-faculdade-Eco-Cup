// ================= CPF ==================
function mascaraCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");   // remove tudo que não é número
    cpf = cpf.substring(0, 11);     // limita a 11 dígitos

    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}

document.getElementById("cpf").addEventListener("input", function () {
    this.value = mascaraCPF(this.value);
});



// ================= TELEFONE CELULAR ==================
document.getElementById("telefone_celular").addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "");

    if (v.length > 11) v = v.substring(0, 11);

    if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    } else {
        v = v.replace(/^(\d*)/, "($1");
    }

    this.value = v;
});



// ================= MÁSCARA DE CEP ==================
document.getElementById('cep').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, "");

    // coloca o hífen no lugar certo
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    e.target.value = value;

    // Se o usuário digitou 8 dígitos → consulta
    if (value.length === 9) {
        buscarCEP(value);
    }
});



// ================= BUSCAR CEP - VIA CEP ==================
function buscarCEP(cep) {
    cep = cep.replace('-', '');

    if (cep.length !== 8) return; // segurança

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {

            if (data.erro) {
                alert("CEP inválido!");
                return;
            }

            // Preenche automaticamente os campos
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;

            // CORREÇÃO → O campo é 'uf', não 'estado'
            document.getElementById('uf').value = data.uf;

        })
        .catch(() => alert("Erro ao consultar CEP"));
}



// ================= MOSTRAR / OCULTAR SENHAS ==================
document.getElementById("verSenha").addEventListener("click", function () {
    let input = document.getElementById("senha");
    input.type = input.type === "password" ? "text" : "password";
});

document.getElementById("verConfirmSenha").addEventListener("click", function () {
    let input = document.getElementById("confirmSenha");
    input.type = input.type === "password" ? "text" : "password";
});
