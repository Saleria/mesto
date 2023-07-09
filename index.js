//получить элементы для работы (папап,  кнопка открытия, крестик)
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__list-open-popup');
const popupCloseButton = popup.querySelector('.popup__close');

//навесить слушатель на клик по кнопке редакции

const popupToggle = function(){
    popup.classList.toggle('popap__opened');
}

popupOpenButton.addEventListener('click', popupToggle);

//навесить слушатель на клик по крестику

popupCloseButton.addEventListener('click', popupToggle);

//получить  эл-ты для работы (сама форма)

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-name');
const jobInput = formElement.querySelector('.popup__form-text');

console.log(jobInput); 

//навесить  слушатель на клик по кнопке и сохранить данные
