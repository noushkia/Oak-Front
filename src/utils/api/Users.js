import axios from "axios";


export async function loginUser(formData) {
    const response = await axios.post('http://localhost:8080/api/users/login', formData);
    return response.data;
}
