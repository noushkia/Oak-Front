import axios from "axios";
import {getAuthHeader, getUsername} from "../Session";

export async function getCommodity(id) {
    return (await axios.get('http://localhost:8080/api/commodities/' + id, getAuthHeader())).data;
}

export async function addUserRating(id, rating) {
    const formData = {
        username: getUsername(),
        rating: rating
    }
    return (await axios.post(`http://localhost:8080/api/commodities/${id}`, formData, getAuthHeader())).data;
}

export async function addComment(id, text) {
    const formData = {
        username: getUsername(),
        text: text,
        date: new Date().toISOString()
    }
    return (await axios.post(`http://localhost:8080/api/commodities/${id}/comments`, formData, getAuthHeader())).data;
}

export async function voteComment(id, commentId, vote) {
    const formData = {
        username: getUsername(),
        vote: vote
    }
    return (await axios.post(`http://localhost:8080/api/commodities/${id}/comments/${commentId}/vote`, formData, getAuthHeader())).data;
}

export async function getCommodities({page, limit = 12}, showAvailableCommodities, sortingAttribute, {type, query}) {
    const params = new URLSearchParams();
    if (showAvailableCommodities) {
        params.append('onlyAvailableCommodities', showAvailableCommodities);
    }
    if (sortingAttribute !== "") {
        params.append('sortBy', sortingAttribute);
    }
    if (type !== "" && query !== "") {
        params.append('searchType', type);
        params.append('searchQuery', query);
    }
    params.append('page', page);
    params.append('limit', limit.toString());
    const response = await axios.get(`http://localhost:8080/api/commodities/?${params.toString()}`, getAuthHeader());
    return response.data;
}
