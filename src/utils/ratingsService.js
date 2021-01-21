import tokenService from './tokenService';

const BASE_URL = '/api/ratings';

export function create(rating, scriptID){

    console.log('fetch', rating)
    return fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({rating: rating, script: scriptID}),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}