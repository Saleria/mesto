class FormValidator {
    constructor(validationSettings, formElement) {
        this._validationSettings = validationSettings;
        this._formElement = formElement;
        this._formSelector = validationSettings.formSelector;
        this._inputSelector = validationSettings.inputSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._inactiveButtonClass = validationSettings.inactiveButtonClass;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._errorClass = validationSettings.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonSave = this._formElement.querySelector(this._submitButtonSelector);
    }
    //функция показывает эл-т ошибки
    _showInputError(inputElement, errorMessage) {
        const formError = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        formError.textContent = errorMessage;
        formError.classList.add(this._errorClass);
    };

    //скрывает эл-т ошибки
    _hideInputError(inputElement) {
        const formError = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        formError.textContent = '';
        formError.classList.remove(this._errorClass);
    };

    //проверка поля на валидность 
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // ищем невалидные импуты в массиве полей ввода
    _checkInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    // очищаем поля ввода от ошибок. 
    resetValidation() {
        this.changeButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    //отключаем и включаем кнопку.
    changeButtonState() {
        if (this._checkInvalidInput(this._inputList)) {
            this._buttonSave.classList.add(this._inactiveButtonClass);
            this._buttonSave.setAttribute('disabled', true);
        } else {
            this._buttonSave.classList.remove(this._inactiveButtonClass);
            this._buttonSave.removeAttribute('disabled', false);
        }
    };

    //добавл.обработчик всем полям формы
    //каждому полю навешиваем слушатель
    //вызываем функцию включ и отключ кнопки отправки
    _setEventListeners() {
        this.changeButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this.changeButtonState();
            });
        });
    };
    //проверка всей формы на валидность
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
};

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message'
};

export default FormValidator;
