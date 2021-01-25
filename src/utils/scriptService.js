import tokenService from './tokenService';

const BASE_URL = '/api/scripts';

export function create(script) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: script,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
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

export function getUserScripts(id) {
    return fetch(`${BASE_URL}/all?author=${id}`, {
        headers: {
            'Authorization' : 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function populateScripts(queries) {
    return fetch(`${BASE_URL}/all${queries}`, {
        headers: {
            'Authorization' : 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}


export function getOne(id) {
    return fetch(`${BASE_URL}/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function getOneForEdit(id) {
    return fetch(`${BASE_URL}/${id}/edit`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function update(script, id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        body: script,
        headers: {
            'Authorization' : 'Bearer ' + tokenService.getToken()
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

export function getFeatured(){
    return fetch(`${BASE_URL}/all/featured`).then(res => res.json());
}