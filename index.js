const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__list-open-popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSaveButton = popup.querySelector('.popup__save-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-name');
let jobInput = formElement.querySelector('.popup__form-text');
let title = document.querySelector('.profile__list-title');
let subtitle = document.querySelector('.profile__list-subtitle');

const popupToggle = function() {
    popup.classList.toggle('popap__opened');
}

function dataText () {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}
dataText();

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupSaveButton.addEventListener('click', popupToggle); 

function handleFormSubmit (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    title.textContent = nameValue; 
    subtitle.textContent = jobValue; 
}

formElement.addEventListener('submit', handleFormSubmit); 




