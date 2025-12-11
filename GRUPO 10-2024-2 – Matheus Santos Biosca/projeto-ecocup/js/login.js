document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-login');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = form.email.value;
        const senha = form.senha.value;

        const usuario = JSON.parse(localStorage.getItem('dadosFormulario'));

        if (usuario && usuario.email === email && usuario.senha === senha) {
            localStorage.setItem('usuarioLogado', JSON.stringify({
                nome: usuario.nome,
                tipo: "cliente"
            }));

            alert("Login realizado!");
            window.location.href = 'painel.html';
        } else {
            alert("Email ou senha incorretos!");
        }
    });
});
