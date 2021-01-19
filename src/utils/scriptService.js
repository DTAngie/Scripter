import { token } from 'morgan';
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

export function getOwnScripts() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }  
    }).then(res => res.json());
}


// export function getUserScripts(id){
//This can be used to get other user's scripts
// }


export function getOne(id){
    return fetch(`${BASE_URL}/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function deleteOne(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers : {
            'Authorization' : 'Bearer ' + tokenService.getToken()
        }
    })
}