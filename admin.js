document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado e é admin
    const currentUser = checkLoggedIn();
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    if (!isAdmin(currentUser)) {
        window.location.href = 'user.html';
        return;
    }
    
    // Configurar botão de logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', logout);
    
    // Configurar formulário para adicionar usuário
    const addUserForm = document.getElementById('addUserForm');
    addUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        
        const result = addUser(username, password, currentUser);
        
        if (result.success) {
            // Limpar formulário e atualizar a lista
            addUserForm.reset();
            renderUserList();
            alert('Usuário adicionado com sucesso!');
        } else {
            alert(result.message);
        }
    });
    
    // Carregar lista de usuários
    renderUserList();
    
    // Função para renderizar a lista de usuários
    function renderUserList() {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        
        const users = getUsers();
        
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            
            const username = document.createElement('span');
            username.textContent = user.username;
            
            userItem.appendChild(username);
            
            // Não mostrar botão de exclusão para o admin
            if (user.username !== 'admin') {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Excluir';
                
                deleteBtn.addEventListener('click', function() {
                    if (confirm(`Tem certeza que deseja excluir o usuário "${user.username}"?`)) {
                        const result = removeUser(user.username, currentUser);
                        
                        if (result.success) {
                            renderUserList();
                            alert('Usuário removido com sucesso!');
                        } else {
                            alert(result.message);
                        }
                    }
                });
                
                userItem.appendChild(deleteBtn);
            } else {
                const adminBadge = document.createElement('span');
                adminBadge.textContent = 'Administrador';
                adminBadge.style.color = '#007bff';
                adminBadge.style.fontWeight = 'bold';
                userItem.appendChild(adminBadge);
            }
            
            userList.appendChild(userItem);
        });
    }
});
