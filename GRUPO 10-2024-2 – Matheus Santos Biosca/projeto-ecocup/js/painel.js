document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuario) {
        alert("Você precisa estar logado.");
        window.location.href = 'login.html';
        return;
    }

    // Mostrar nome no painel
    const span = document.getElementById('nome-usuario');
    if (span) {
        const partes = usuario.nome.trim().split(" ");
        span.textContent = partes.length > 1 ? `${partes[0]} ${partes[1]}` : partes[0];
    }

    // Logout
    const btnLogout = document.getElementById('logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('usuarioLogado');
            alert("Você saiu da conta.");
            window.location.href = 'index.html';
        });
    }
});
