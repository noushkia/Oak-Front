export function getUsername() {
    return localStorage.getItem('username');
}

export function saveUsername(username) {
    localStorage.setItem('username', username);
}

export function removeUsername() {
    localStorage.removeItem('username');
}

export function getJWT() {
    return localStorage.getItem('jwt');
}

export function saveJWT(jwt) {
    localStorage.setItem('jwt', jwt);
}

export function removeJWT() {
    localStorage.removeItem('jwt');
}

export function getAuthHeader() {
    let jwt = getJWT();
    if (jwt == null)
        return {};
    else
        return {'headers': {'Authorization': `${jwt}`}};
}
