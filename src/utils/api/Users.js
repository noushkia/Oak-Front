import axios from "axios";
import {getUsername} from "../Session";


export async function loginUser(formData) {
    return (await axios.post('http://localhost:8080/api/users/login', formData)).data;
}

export async function signUpUser(formData) {
    return (await axios.post('http://localhost:8080/api/users/signup', formData)).data;
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
    return (await axios.post(`http://localhost:8080/api/users/${getUsername()}/buy`)).data;
}

export async function addToBuyList(formData) {
    return (await axios.post(`http://localhost:8080/api/users/${getUsername()}/buyList`, formData)).data;
}

export async function updateInCart(formData) {
    return (await axios.put(`http://localhost:8080/api/users/${getUsername()}/buyList`, formData)).data;
}
