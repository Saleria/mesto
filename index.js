//получить элементы для работы (папап,  кнопка открытия, крестик)
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__list-open-popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSaveButton = popup.querySelector('.popup__save-button');



//навесить слушатель на клик по кнопке редакции

const popupToggle = function(){
    popup.classList.toggle('popap__opened');
}

popupOpenButton.addEventListener('click', popupToggle);

//навесить слушатель на клик по крестику  и кнопке сохранить

popupCloseButton.addEventListener('click', popupToggle);
popupSaveButton.addEventListener('click', popupToggle); 

//получить  эл-ты для работы (сама форма)

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-name');
let jobInput = formElement.querySelector('.popup__form-text');
let title = document.querySelector('.profile__list-title');
let subtitle = document.querySelector('.profile__list-subtitle');

//передать данные из тайтл и сабтайтл при открытии попапа в инпуты
function () {
    nameInput.value = title;
}

//обработчик отправки формы (хотя она пока никуда не отправляется)

function handleFormSubmit (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    title.textContent = nameValue; 
    subtitle.textContent = jobValue; 
}

//навесить  слушатель на клик по кнопке и сохранить данные
formElement.addEventListener('submit', handleFormSubmit); 




