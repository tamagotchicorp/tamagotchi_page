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

// Função para verificar se o usuário existe
function checkUserExists(username) {
    // Em uma implementação real, esta função iria:
    // 1. Verificar se existe um arquivo com o nome username.html na pasta user/
    
    // Para fins de demonstração, usamos os usuários padrão
    const defaultUsers = ['admin', 'Seraphimon', 'Wargreymon', 'Patamon', 'Hongo'];
    return defaultUsers.includes(username);
}

// Sistema de partículas de digievolução
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = Object.assign({
            count: 30,
            colors: ['#FFD700', '#FFF8E1', '#FFEB3B', '#FFF176'],
            minSize: 4,
            maxSize: 12,
            duration: {min: 2000, max: 3000},
            radius: {min: 50, max: 150}
        }, options);
        
        this.particles = [];
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('evolution-particle');
        
        // Dimensões do container
        const containerRect = this.container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        
        // Tamanho da partícula
        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        
        // Cor aleatória da lista de cores
        const color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
        
        // Configuração da partícula
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${centerX - size / 2}px`;
        particle.style.top = `${centerY - size / 2}px`;
        
        // Adicionar ao container
        this.container.appendChild(particle);
        
        // Determinar posição final
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 
            (this.options.radius.max - this.options.radius.min) + 
            this.options.radius.min;
        
        const endX = centerX + Math.cos(angle) * distance - size / 2;
        const endY = centerY + Math.sin(angle) * distance - size / 2;
        
        // Duração da animação
        const duration = Math.random() * 
            (this.options.duration.max - this.options.duration.min) + 
            this.options.duration.min;
        
        // Animar
        const animation = particle.animate([
            { 
                transform: 'scale(0)', 
                opacity: 0 
            },
            { 
                transform: 'scale(1)',
                opacity: 1,
                offset: 0.2
            },
            { 
                transform: `translate(${endX - (centerX - size / 2)}px, ${endY - (centerY - size / 2)}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            fill: 'forwards'
        });
        
        // Remover a partícula quando a animação terminar
        animation.onfinish = () => {
            particle.remove();
        };
        
        return {
            element: particle,
            animation: animation
        };
    }
    
    emit() {
        for (let i = 0; i < this.options.count; i++) {
            setTimeout(() => {
                const particle = this.createParticle();
                this.particles.push(particle);
            }, Math.random() * 500); // Início escalonado para parecer mais natural
        }
    }
    
    clear() {
        this.particles.forEach(particle => {
            if (particle.animation) {
                particle.animation.cancel();
            }
            if (particle.element && particle.element.parentNode) {
                particle.element.remove();
            }
        });
        this.particles = [];
    }
}

// Efeitos sonoros
class SoundEffects {
    constructor() {
        this.sounds = {
            click: null,
            evolution: null,
            success: null,
            error: null
        };
        
        // Em uma implementação real, carregaria os arquivos de áudio
        // this.loadSounds();
    }
    
    loadSounds() {
        this.sounds.click = new Audio('assets/sounds/click.mp3');
        this.sounds.evolution = new Audio('assets/sounds/evolution.mp3');
        this.sounds.success = new Audio('assets/sounds/success.mp3');
        this.sounds.error = new Audio('assets/sounds/error.mp3');
    }
    
    play(sound) {
        if (this.sounds[sound]) {
            this.sounds[sound].currentTime = 0;
            this.sounds[sound].play().catch(e => console.log('Erro ao reproduzir som:', e));
        }
    }
}

// Inicializar sons
// const soundFx = new SoundEffects();

// Adicionar efeitos de hover aos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach((button, index) => {
        // Adicionar delay para animar sequencialmente
        setTimeout(() => {
            button.classList.add('active');
        }, index * 100);
        
        // Adicionar efeito de hover
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
        
        // Efeito sonoro
        button.addEventListener('click', () => {
            // soundFx.play('click');
            
            // Efeito visual de clique
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
});

// Script para geração automática de arquivos de usuário
function generateUserFiles() {
    // Este código seria executado em um ambiente Node.js
    // para gerar arquivos físicos para cada usuário
    
    const defaultUsers = ['admin', 'Seraphimon', 'Wargreymon', 'Patamon', 'Hongo'];
    const template = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TM-Dell - {{USERNAME}}</title>
        <link rel="stylesheet" href="../assets/style.css">
    </head>
    <body class="user-body {{USERNAME_LOWER}}-theme">
        <div class="tamagotchi-frame">
            <div class="screen">
                <div class="digimon-container">
                    <img id="digimon" src="../assets/digimon/{{USERNAME_LOWER}}_base.gif" alt="{{USERNAME}}" class="digimon-img">
                    <div id="particles-container" class="particles-container"></div>
                </div>
            </div>
            <div class="tamagotchi-buttons">
                <div class="button" id="left-button" title="Sair"></div>
                <div class="button" id="center-button" title="Alimentar"></div>
                <div class="button" id="right-button" title="Menu"></div>
            </div>
        </div>
    
        <script src="../assets/script.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const leftButton = document.getElementById('left-button');
                const centerButton = document.getElementById('center-button');
                const rightButton = document.getElementById('right-button');
                const digimonImg = document.getElementById('digimon');
                const particlesContainer = document.getElementById('particles-container');
                
                const username = '{{USERNAME}}';
                const usernameLower = '{{USERNAME_LOWER}}';
                
                // Inicializar sistema de partículas
                const particles = new ParticleSystem(particlesContainer);
                
                // Botão esquerdo: Sair (voltar para login)
                leftButton.addEventListener('click', function() {
                    window.location.href = '../index.html';
                });
                
                // Botão central: Alimentar (digievolução)
                centerButton.addEventListener('click', function() {
                    // Trocar para GIF de evolução
                    digimonImg.src = \`../assets/digimon/\${usernameLower}_evolution.gif\`;
                    digimonImg.classList.add('evolving');
                    
                    // Emitir partículas
                    particles.emit();
                    
                    // Após 5 segundos, volta ao normal
                    setTimeout(() => {
                        digimonImg.src = \`../assets/digimon/\${usernameLower}_base.gif\`;
                        digimonImg.classList.remove('evolving');
                        particles.clear();
                    }, 5000);
                });
            });
        </script>
    </body>
    </html>`;
    
    defaultUsers.forEach(username => {
        const content = template
            .replace(/\{\{USERNAME\}\}/g, username)
            .replace(/\{\{USERNAME_LOWER\}\}/g, username.toLowerCase());
            
        // Em um ambiente Node.js, aqui salvaria o arquivo
        console.log(`Gerando arquivo para ${username}`);
    });
}

// Função para criar um sistema de partículas simples para o botão
function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.backgroundColor = '#ff77a9';
        particle.style.borderRadius = '50%';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.zIndex = '1000';
        
        // Posiciona na localização do botão
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        document.body.appendChild(particle);
        
        // Ângulo aleatório
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30 + 10;
        const duration = Math.random() * 600 + 400;
        
        // Anima
        const animation = particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            fill: 'forwards'
        });
        
        // Remove a partícula quando a animação terminar
        animation.onfinish = () => {
            particle.remove();
        };
    }
}

// Adicionar partículas aos cliques de botão
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('button')) {
        createButtonParticles(e.target);
    }
});
