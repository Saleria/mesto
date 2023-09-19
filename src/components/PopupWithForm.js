import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallBack) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__text');
        this._formSubmitCallBack = formSubmitCallBack;        
    }

    //собираем данные всех полей формы, возвращаем объект с этими данными
    _getInputValues() {
        const inputValues = {};
        this._inputList = Array.from(this._inputs);
        this._inputList.forEach((input) => {
             inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    //добавляем обработчик сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();                     
            this._formSubmitCallBack(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}