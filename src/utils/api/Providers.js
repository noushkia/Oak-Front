import axios from "axios";
import {getAuthHeader} from "../Session";

export async function getProvider(id) {
    return (await axios.get('http://localhost:8080/api/providers/' + id, getAuthHeader())).data;
}
