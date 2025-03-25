<?php
// Este script seria chamado pelo admin.js quando um novo usuário é adicionado

// Obter o nome do usuário da requisição
$username = $_POST['username'];

// Validar o nome do usuário
if (empty($username)) {
    echo json_encode(['success' => false, 'message' => 'Nome de usuário não pode estar vazio']);
    exit;
}

// Caminho para a pasta de usuários
$userDir = __DIR__ . '/users/';

// Verificar se o arquivo já existe
if (file_exists($userDir . $username . '.html')) {
    echo json_encode(['success' => false, 'message' => 'Usuário já existe']);
    exit;
}

// Obter o conteúdo do template
$templateContent = file_get_contents(__DIR__ . '/user_template.html');

// Substituir placeholders pelo nome do usuário
$pageContent = str_replace('{{USERNAME}}', $username, $templateContent);

// Criar o arquivo HTML do usuário
if (file_put_contents($userDir . $username . '.html', $pageContent)) {
    echo json_encode(['success' => true, 'message' => 'Usuário criado com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao criar página do usuário']);
}
?>