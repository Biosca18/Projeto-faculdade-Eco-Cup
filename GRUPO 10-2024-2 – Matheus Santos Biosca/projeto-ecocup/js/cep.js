// Função para limpar os campos caso o CEP seja inválido
function limparFormulario() {
    if (ruaInput) ruaInput.value = "";
    if (cidadeInput) cidadeInput.value = "";
    if (ufInput) ufInput.value = "";
}

// Script JavaScript para buscar o CEP
const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const numeroInput = document.getElementById('numero');

if (cepInput && ruaInput && cidadeInput && ufInput && numeroInput) {
    cepInput.addEventListener('blur', async (e) => {
        let cep = e.target.value.replace(/\D/g, '');

        if (cep !== "") {
            let validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {
                ruaInput.value = "...";
                cidadeInput.value = "...";
                ufInput.value = "...";

                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await response.json();

                    if (!("erro" in data)) {
                        ruaInput.value = data.logradouro;
                        cidadeInput.value = data.localidade;
                        ufInput.value = data.uf;
                        numeroInput.focus();
                    } else {
                        alert("CEP não encontrado.");
                        limparFormulario();
                    }
                } catch (error) {
                    alert("Erro ao buscar CEP.");
                    limparFormulario();
                }
            } else {
                alert("Formato de CEP inválido.");
                limparFormulario();
            }
        } else {
            limparFormulario();
        }
    });
}
