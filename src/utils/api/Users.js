import axios from "axios";


export async function getUser(username) {
    // const response = await axios.get('http://localhost:8080/api/users/' + username);
    // return response.data;
    return {
        address: "amir-home",
        birthDate: "2000-01-01",
        credit: 25000,
        email: "amir@gmail.com",
        password: "1234",
        username: "amir"
    };
}
