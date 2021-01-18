import tokenService from './tokenService';

const BASE_URL = '/api/scripts';

export function create(script) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(script),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}