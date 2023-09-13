import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor (popupSelector, formSubmitCallBack) {
        super(popupSelector); 
        this._form = document.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__text'); 
        this._formSubmitCallBack = formSubmitCallBack; 
        this._submitButton = this._form.querySelector('.popup__save-button');
    }

    //собираем данные всех полей формы
    _getInputValues(){
        const inputValues = {}; 
        this._inputList = Array.from(this._inputs); 
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value; 
        })
        return inputValues; 
    }

    setEventListeners() {
        super.setEventListeners (); 
        this._submitButton.addEventListener('submit', (evt) => 
        evt.preventDefault();
        
        )
    }
}