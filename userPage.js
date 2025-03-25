document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const currentUser = checkLoggedIn();
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Mostrar o nome do usuário
    const usernameDisplay = document.getElementById('usernameDisplay');
    usernameDisplay.textContent = currentUser;
    
    // Verificar se é um admin para mostrar o painel de administração
    if (isAdmin(currentUser)) {
        const adminPanel = document.getElementById('adminPanel');
        adminPanel.style.display = 'block';
    }
    
    // Configurar botão de logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', logout);
    
    // Configurar botões de ação
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const animationElement = document.querySelector('.animation-element');
    
    btn1.addEventListener('click', function() {
        resetAnimations();
        animationElement.classList.add('pulse');
    });
    
    btn2.addEventListener('click', function() {
        resetAnimations();
        animationElement.classList.add('bounce');
    });
    
    btn3.addEventListener('click', function() {
        resetAnimations();
        animationElement.classList.add('spin');
    });
    
    function resetAnimations() {
        animationElement.classList.remove('pulse', 'bounce', 'spin');
        void animationElement.offsetWidth; // Necessário para reiniciar a animação
    }
});
