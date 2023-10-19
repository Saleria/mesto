import { Popup } from "./Popup";

export class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    setSubmitAction(callback) {
        this._handleSubmit = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })
    }
}