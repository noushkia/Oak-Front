import axios from "axios";


export async function loginUser(formData) {
    const response = await axios.post('http://localhost:8080/api/users/login', formData);
    return response.data;
}

export async function signUpUser(formData) {
    const response = await axios.post('http://localhost:8080/api/users/signup', formData);
    return response.data;
}

export async function getUser(username) {
    // todo implement api
    const response = await axios.get('http://localhost:8080/api/users/' + username);
    return response.data;
}

export async function addCredit(credit) {
    // todo implement api
    // const response = await axios.post('http://localhost:8080/api/users/' );
    // return response.data;
}

export async function addDiscount(code) {
    // todo implement api
    // const response = await axios.post('http://localhost:8080/api/users/' );
    // return response.data;
}

export async function buy() {
    // todo implement api
    const response = await axios.post('http://localhost:8080/api/users/buy');
    return response.data;
}

export async function updateInCart(commodityId, quantity) {
    // todo implement api
}
