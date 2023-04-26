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

export async function getCommodities(onlyAvailableCommodities, sortBy, {searchBy, query}) {
    // todo implement api
    //  How to pass conditions?
    // const response = await axios.post('http://localhost:8080/api/commodities/');
    // return response.data;
}
