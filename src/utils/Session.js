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
        return {
            headers: {
                Authorization: jwt
            },
            withCredentials: true
        };
}
