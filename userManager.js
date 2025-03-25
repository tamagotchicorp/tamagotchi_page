// Inicializar usuários no localStorage se não existirem
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            { username: 'admin', password: 'admin123', isAdmin: true }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// Obter todos os usuários
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Verificar se o usuário existe e se a senha está correta
function authenticateUser(username, password) {
    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    return user || null;
}

// Verificar se um usuário é administrador
function isAdmin(username) {
    const users = getUsers();
    const user = users.find(user => user.username === username);
    return user && user.isAdmin;
}

// Adicionar um novo usuário (apenas admin pode fazer isso)
function addUser(username, password, currentUser) {
    if (!isAdmin(currentUser)) {
        return { success: false, message: 'Apenas administradores podem adicionar usuários' };
    }
    
    const users = getUsers();
    
    // Verificar se o usuário já existe
    if (users.some(user => user.username === username)) {
        return { success: false, message: 'Este nome de usuário já existe' };
    }
    
    // Adicionar novo usuário
    users.push({
        username,
        password,
        isAdmin: false
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: 'Usuário adicionado com sucesso' };
}

// Remover um usuário (apenas admin pode fazer isso)
function removeUser(username, currentUser) {
    if (!isAdmin(currentUser)) {
        return { success: false, message: 'Apenas administradores podem remover usuários' };
    }
    
    // Não permitir que o admin seja removido
    if (username === 'admin') {
        return { success: false, message: 'O usuário admin não pode ser removido' };
    }
    
    const users = getUsers();
    const updatedUsers = users.filter(user => user.username !== username);
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return { success: true, message: 'Usuário removido com sucesso' };
}

// Verificar se o usuário está logado
function checkLoggedIn() {
    return localStorage.getItem('currentUser');
}

// Fazer login
function login(username, password) {
    const user = authenticateUser(username, password);
    if (user) {
        localStorage.setItem('currentUser', username);
        return { success: true };
    } else {
        return { success: false, message: 'Nome de usuário ou senha incorretos' };
    }
}

// Fazer logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Inicializar usuários quando o script é carregado
initializeUsers();
