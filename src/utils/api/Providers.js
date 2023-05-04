import axios from "axios";

export async function getProvider(id) {
    return (await axios.get('http://localhost:8080/api/providers/' + id)).data;
}
