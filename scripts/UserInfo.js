export class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }
    getUserInfo() {
        return {
            user: this._name.textContent,
            info: this._info.textContent
        }
    }

    setUserInfo({ user, info }) {
        this._name.textContent = user;
        this._info.textContent = info;
    }
}