export function getUsername() {
    return localStorage.getItem('username');
}

export function saveUsername(username) {
    localStorage.setItem('username', username);
}
