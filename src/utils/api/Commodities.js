import axios from "axios";

export async function getCommodity(id) {
    // todo implement api
    //  1. should we send the number of ratings too? to get the count variable...
    //  2. What about provider name?
    const response = await axios.get('http://localhost:8080/api/commodities/' + id);
    return response.data;
}

export async function addUserRating(rating) {
    // todo implement api
    // const response = await axios.post('http://localhost:8080/api/commodities/');
    // return response.data;
}

export async function addComment(newComment) {
    // todo implement api
    // const response = await axios.post('http://localhost:8080/api/commodities/');
    // return response.data;
}

export async function voteComment(username, commentId, vote) {
    // todo implement api
    // const response = await axios.post('http://localhost:8080/api/commodities/');
    // return response.data;
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
    console.log(`http://localhost:8080/api/commodities/?${params.toString()}`);
    const response = await axios.get(`http://localhost:8080/api/commodities/?${params.toString()}`);
    return response.data;
}
