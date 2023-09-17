export class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent
        }
    }

    //принимает новые данные пользователя
    setUserInfo({name, info}) {
        this._name.textContent = name;
        this._info.textContent = info;
    }
}