export class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _testResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._testResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._testResponse)
    }

    changeUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._testResponse)
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._testResponse)
    }

    deleteCard(cardId)) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE', 
            headers: this._headers
        })
        .then(this._testResponse)
    }
}
