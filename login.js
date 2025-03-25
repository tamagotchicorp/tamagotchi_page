document.addEventListener('DOMContentLoaded', function() {
    // Redirecionar para a página do usuário se já estiver logado
    if (checkLoggedIn()) {
        window.location.href = 'user.html';
        return;
    }
    
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const result = login(username, password);
        
        if (result.success) {
            window.location.href = 'user.html';
        } else {
            errorMessage.textContent = result.message;
            errorMessage.style.display = 'block';
        }
    });
});
