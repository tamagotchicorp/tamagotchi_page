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
    
    // Verifica se diretório "assets/digimon" existe, senão cria
    const digimonDir = path.join(__dirname, 'assets', 'digimon');
    if (!fs.existsSync(digimonDir)) {
        if (!fs.existsSync(path.join(__dirname, 'assets'))) {
            fs.mkdirSync(path.join(__dirname, 'assets'));
        }
        fs.mkdirSync(digimonDir);
        console.log('Diretório de digimons criado.');
    }
    
    // Lê o template
    const template = `<!DOCTYPE html>
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
            
            // Botão esquerdo: Sair (voltar para login)
            leftButton.addEventListener('click', function() {
                window.location.href = '../index.html';
            });
            
            // Botão central: Alimentar (digievolução)
            centerButton.addEventListener('click', function() {
                // Trocar para GIF de evolução
                digimonImg.src = \`../assets/digimon/\${usernameLower}_evolution.gif\`;
                digimonImg.classList.add('evolving');
                
                // Criar efeito de partículas
                createDigiEvolutionParticles();
                
                // Após 5 segundos, volta ao normal
                setTimeout(() => {
                    digimonImg.src = \`../assets/digimon/\${usernameLower}_base.gif\`;
                    digimonImg.classList.remove('evolving');
                    clearParticles();
                }, 5000);
            });
            
            // Função para criar partículas de digievolução
            function createDigiEvolutionParticles() {
                clearParticles(); // Limpa partículas anteriores
                
                // Cria 30 partículas
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        createParticle();
                    }, Math.random() * 500);
                }
            }
            
            // Função para criar uma partícula
            function createParticle() {
                const particle = document.createElement('div');
                particle.classList.add('evolution-particle');
                
                // Posição aleatória na tela
                const screenWidth = particlesContainer.clientWidth;
                const screenHeight = particlesContainer.clientHeight;
                
                const size = Math.random() * 8 + 4; // Tamanho entre 4px e 12px
                
                // Posição inicial no centro da tela
                const startX = screenWidth / 2 - size / 2;
                const startY = screenHeight / 2 - size / 2;
                
                particle.style.width = \`\${size}px\`;
                particle.style.height = \`\${size}px\`;
                particle.style.left = \`\${startX}px\`;
                particle.style.top = \`\${startY}px\`;
                
                // Cor aleatória entre dourado e branco
                const hue = Math.random() * 60 + 40; // 40-100 (amarelo a dourado)
                const lightness = Math.random() * 30 + 70; // 70-100% (brilhante)
                particle.style.backgroundColor = \`hsl(\${hue}, 100%, \${lightness}%)\`;
                
                // Adiciona ao container
                particlesContainer.appendChild(particle);
                
                // Anima a partícula
                const angle = Math.random() * Math.PI * 2; // Ângulo aleatório
                const distance = Math.random() * 100 + 50; // Distância entre 50 e 150px
                
                const destX = startX + Math.cos(angle) * distance;
                const destY = startY + Math.sin(angle) * distance;
                
                // Usa Web Animation API
                const animation = particle.animate(
                    [
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
                            transform: \`translate(\${destX - startX}px, \${destY - startY}px) scale(0)\`,
                            opacity: 0 
                        }
                    ],
                    {
                        duration: 2000 + Math.random() * 1000,
                        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                        fill: 'forwards'
                    }
                );
                
                // Remove a partícula após a animação
                animation.onfinish = () => {
                    particle.remove();
                };
            }
            
            // Função para limpar todas as partículas
            function clearParticles() {
                while (particlesContainer.firstChild) {
                    particlesContainer.removeChild(particlesContainer.firstChild);
                }
            }
        });
    </script>
</body>
</html>`;
    
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
    
    // Nota: Você precisará criar/obter manualmente os gifs dos digimons para cada usuário:
    // - assets/digimon/seraphimon_base.gif e assets/digimon/seraphimon_evolution.gif
    // - assets/digimon/wargreymon_base.gif e assets/digimon/wargreymon_evolution.gif
    // - etc.
    console.log("\nLEMBRETE: Você precisa criar/obter manualmente os arquivos GIF dos digimons para cada usuário!");
    console.log("Coloque-os na pasta assets/digimon/ com os nomes:");
    defaultUsers.forEach(user => {
        const userLower = user.toLowerCase();
        console.log(`- ${userLower}_base.gif (estado inicial)`);
        console.log(`- ${userLower}_evolution.gif (animação de digievolução)`);
    });
}

// Executa a função
generateUserPages();
