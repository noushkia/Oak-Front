import axios from "axios";
import {getAuthHeader} from "../Session";


export async function loginUser(body) {
    return (await axios.post('http://localhost:8080/api/users/login', body)).data;
}

export async function signUpUser(body) {
    return (await axios.post('http://localhost:8080/api/users/signUp', body)).data;
}

export async function getUser(username) {
    console.log("getting user " + username);
    return (await axios.get('http://localhost:8080/api/users', getAuthHeader())).data;
}

export async function addCredit(body) {
    return (await axios.put(`http://localhost:8080/api/users/credit`, body, getAuthHeader())).data;
}

export async function addDiscount(body) {
    return (await axios.post(`http://localhost:8080/api/users/discounts`, body, getAuthHeader())).data;
}

export async function buy() {
    return (await axios.post(`http://localhost:8080/api/users/buyList/finalize`, getAuthHeader())).data;
}

export async function addToBuyList(body) {
    return (await axios.post(`http://localhost:8080/api/users/buyList`, body, getAuthHeader())).data;
}

export async function updateInCart(body) {
    return (await axios.put(`http://localhost:8080/api/users/buyList`, body, getAuthHeader())).data;
}
