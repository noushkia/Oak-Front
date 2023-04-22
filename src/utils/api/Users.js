import axios from "axios";


export async function loginUser(username, password) {
    const body = {
        username: username,
        password: password,
    };
    const response = await axios.post('http://localhost:8080/api/users/login', body);
    return response.data;
}
