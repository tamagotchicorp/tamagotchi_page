// Este script pode ser executado para gerar automaticamente as páginas dos usuários
const fs = require('fs');
const path = require('path');

// Lista de usuários padrão
const defaultUsers = ['admin', 'Seraphimon', 'Wargreymon', 'Patamon', 'Hongo'];

// Função para gerar as páginas de usuário
function generateUserPages() {
    // Verifica se diretório "user" existe, senão cria
    const userDir = path.join(__dirname, 'user');
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
        console.log('Diretório de usuários criado.');
    }
    
    // Lê o template
    const templatePath = path.join(__dirname, 'user', 'template.html');
    let template;
    
    try {
        template = fs.readFileSync(templatePath, 'utf8');
    } catch (err) {
        console.error('Erro ao ler o template:', err);
        return;
    }
    
    // Gera as páginas para cada usuário
    let createdCount = 0;
    
    defaultUsers.forEach(username => {
        // Substitui as variáveis no template
        const userContent = template
            .replace(/\{\{USERNAME\}\}/g, username)
            .replace(/\{\{USERNAME_LOWER\}\}/g, username.toLowerCase());
        
        // Caminho para o arquivo do usuário
        const userPath = path.join(userDir, `${username}.html`);
        
        // Escreve o arquivo
        try {
            fs.writeFileSync(userPath, userContent);
            createdCount++;
            console.log(`Página do usuário ${username} criada com sucesso!`);
        } catch (err) {
            console.error(`Erro ao criar página para ${username}:`, err);
        }
    });
    
    console.log(`Processo concluído. ${createdCount} páginas de usuário criadas.`);
}

// Executa a função
generateUserPages();