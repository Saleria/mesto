export class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._info.textContent
        }
    }

    //принимает новые данные пользователя
    setUserInfo({ name, about }) {
        this._name.textContent = name;
        this._info.textContent = about;
    }

    setUserAvatar({ avatar }) {
        this._avatar.src = avatar;
    }
}