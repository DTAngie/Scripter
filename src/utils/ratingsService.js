import tokenService from './tokenService';

const BASE_URL = '/api/ratings';

export function create(rating, scriptID){
    return fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({rating: rating, script: scriptID}),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export function getOne(script, user) {
    return fetch(`${BASE_URL}/?user=${user}&&script=${script}`, {
        headers: {
            'Authorization' : 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function update(newRating, currentRatingID) {
    return fetch(`${BASE_URL}/${currentRatingID}`, {
        method: 'PUT',
        body: JSON.stringify({rating: newRating}),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}