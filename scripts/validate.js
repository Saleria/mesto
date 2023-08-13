// функция показывает эл-т ошибки 
const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(validationSettings.errorClass);
  };

// функция скрывает эл-т ошибки
const hideInputError = (formElement, inputElement, validationSettings) => {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    formError.textContent = '';
    formError.classList.remove(validationSettings.errorClass);
};

// проверка поля на валидность
const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        hideInputError(formElement, inputElement, validationSettings);
    }
};

//дизейблим кнопку
// ищем невалидные импуты в массиве полей ввода
const checkInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//отключаем и включаем кнопку.
//принимает массив полей ввода и саму кнопку
const changeButtonState = (inputList, buttonSave, validationSettings) => {
    if (checkInvalidInput(inputList)) {
        buttonSave.classList.add(validationSettings.inactiveButtonClass);
        buttonSave.setAttribute('disabled', true);
    } else {
        buttonSave.classList.remove(validationSettings.inactiveButtonClass);
        buttonSave.removeAttribute('disabled', false);
    }
};

//добавл.обработчик всем полям формы
//ищем все поля внутри формы, делаем массив и каждому полю навешиваем слушатель
//вызываем функцию включ и отключ кнопки отправки
const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonSave = formElement.querySelector(validationSettings.submitButtonSelector);
    changeButtonState(inputList, buttonSave, validationSettings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationSettings);
            changeButtonState(inputList, buttonSave, validationSettings);
        });
    });
};

//добавляем обработчик всем формам на странице
//находим все формы в дом, создаем массив и для каждой формы вызываем функцию
const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationSettings);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message'
});