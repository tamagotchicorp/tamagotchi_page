<?php
// Este script seria chamado pelo admin.js quando um usuário é excluído

// Obter o nome do usuário da requisição
$username = $_POST['username'];

// Validar o nome do usuário
if (empty($username)) {
    echo json_encode(['success' => false, 'message' => 'Nome de usuário não pode estar vazio']);
    exit;
}

// Não permitir excluir o usuário admin
if ($username === 'admin') {
    echo json_encode(['success' => false, 'message' => 'Não é possível excluir o usuário admin']);
    exit;
}

// Caminho para a pasta de usuários
$userDir = __DIR__ . '/users/';
$userFile = $userDir . $username . '.html';

// Verificar se o arquivo existe
if (!file_exists($userFile)) {
    echo json_encode(['success' => false, 'message' => 'Usuário não encontrado']);
    exit;
}

// Excluir o arquivo HTML do usuário
if (unlink($userFile)) {
    echo json_encode(['success' => true, 'message' => 'Usuário excluído com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao excluir página do usuário']);
}
?>