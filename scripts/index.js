const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__list-edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__text_name');
let jobInput = formElement.querySelector('.popup__text_job');
let title = document.querySelector('.profile__list-title');
let subtitle = document.querySelector('.profile__list-subtitle');

const popupToggle = function() {
    popup.classList.toggle('popup_opened');
}

function dataText () {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    title.textContent = nameValue; 
    subtitle.textContent = jobValue; 
    popupToggle ();
}

formElement.addEventListener('submit', handleFormSubmit); 
popupOpenButton.addEventListener('click', popupToggle, dataText());
popupCloseButton.addEventListener('click', popupToggle);





