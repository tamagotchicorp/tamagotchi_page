// Funções utilitárias para geração de páginas de usuário
const userGenerator = {
    // Função para criar novo arquivo de usuário
    createUserPage: function(username) {
        // Em uma implementação real, esta função iria:
        // 1. Ler o arquivo template.html
        // 2. Substituir as variáveis {{USERNAME}} e {{USERNAME_LOWER}}
        // 3. Salvar como um novo arquivo na pasta user/
        
        console.log(`Criando página para o usuário: ${username}`);
        
        // Como isso é apenas para demonstração, retornamos uma mensagem
        return `Página do usuário ${username} criada com sucesso!`;
    },
    
    // Função para deletar arquivo de usuário
    deleteUserPage: function(username) {
        // Em uma implementação real, esta função iria:
        // 1. Verificar se o arquivo existe
        // 2. Deletar o arquivo do sistema de arquivos
        
        console.log(`Deletando página do usuário: ${username}`);
        
        // Como isso é apenas para demonstração, retornamos uma mensagem
        return `Página do usuário ${username} deletada com sucesso!`;
    },
    
    // Função para listar todos os usuários
    listUsers: function() {
        // Em uma implementação real, esta função iria:
        // 1. Ler todos os arquivos na pasta user/
        // 2. Retornar uma lista de nomes de usuários (sem a extensão .html)
        
        // Para fins de demonstração, retornamos os usuários padrão
        return ['admin', 'Seraphimon', 'Wargreymon', 'Patamon', 'Hongo'];
    }
};

// Animações para os botões do usuário
const animations = {
    feed: function(character) {
        // Lógica para animar alimentação do personagem
        console.log(`Alimentando ${character}`);
    },
    
    play: function(character) {
        // Lógica para animar brincadeira com o personagem
        console.log(`Brincando com ${character}`);
    },
    
    sleep: function(character) {
        // Lógica para animar sono do personagem
        console.log(`${character} dormindo`);
    }
};

// Função para verificar se o usuário existe
function checkUserExists(username) {
    // Em uma implementação real, esta função iria:
    // 1. Verificar se existe um arquivo com o nome username.html na pasta user/
    
    // Para fins de demonstração, usamos os usuários padrão
    const defaultUsers = ['admin', 'Seraphimon', 'Wargreymon', 'Patamon', 'Hongo'];
    return defaultUsers.includes(username);
}

// Funções auxiliares para gerenciamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona classe para animar elementos quando carregados
    const animElements = document.querySelectorAll('.tamagotchi-frame, .pixel-title, .pixel-button');
    
    animElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, index * 200);
    });
    
    // Adiciona efeito sonoro aos botões (se implementado)
    const buttons = document.querySelectorAll('.pixel-button, .user-button, .button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            // Reproduzir som de clique (se implementado)
            // playSound('click.mp3');
        });
    });
});

// Função para criar uma animação de partículas quando botões são clicados
function createParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.backgroundColor = color || '#ff77a9';
        
        // Posição inicial baseada nas coordenadas do clique
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Animação aleatória
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        const size = Math.random() * 5 + 3;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Adiciona ao DOM
        document.body.appendChild(particle);
        
        // Anima a partícula
        const animation = particle.animate([
            { 
                transform: `translate(0, 0) scale(1)`,
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * 100}px, ${Math.sin(angle) * 100}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        });
        
        // Remove a partícula após a animação
        animation.onfinish = () => {
            particle.remove();
        };
    }
}

// Adiciona efeito de partículas aos botões
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('pixel-button') || 
        e.target.classList.contains('user-button')) {
        createParticles(e.clientX, e.clientY);
    }
});