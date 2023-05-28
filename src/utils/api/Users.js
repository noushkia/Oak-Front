import axios from "axios";
import {getUsername} from "../Session";


export async function loginUser(body) {
    return (await axios.post('http://localhost:8080/api/users/login', body)).data;
}

export async function signUpUser(body) {
    return (await axios.post('http://localhost:8080/api/users/signUp', body)).data;
}

export async function getUser(username) {
    return  (await axios.get('http://localhost:8080/api/users/' + username)).data;
}

export async function addCredit(body) {
    return (await axios.put(`http://localhost:8080/api/users/${getUsername()}/credit`, body)).data;
}

export async function addDiscount(body) {
    return (await axios.post(`http://localhost:8080/api/users/${getUsername()}/discounts`, body)).data;
}

export async function buy() {
    return (await axios.post(`http://localhost:8080/api/users/${getUsername()}/buyList/finalize`)).data;
}

export async function addToBuyList(body) {
    return (await axios.post(`http://localhost:8080/api/users/${getUsername()}/buyList`, body)).data;
}

export async function updateInCart(body) {
    return (await axios.put(`http://localhost:8080/api/users/${getUsername()}/buyList`, body)).data;
}
