function login() {
  const username = document.getElementById('username').value.trim();
  const users = JSON.parse(localStorage.getItem('users')) || ["Seraphimon", "Wargreymon", "Patamon", "Hongo"];

  if (users.includes(username)) {
    localStorage.setItem('currentUser', username);
    window.location.href = 'home.html';
  } else {
    alert('Usuário não encontrado!');
  }
}
