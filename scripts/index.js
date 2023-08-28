export { openPopup };
import Card from "./Card.js";
import FormValidator from './FormValidator.js';
import {initialCards} from './constants.js';

const popup = document.querySelector('.popup');
const buttonOpenEditProfileForm = document.querySelector('.profile__list-edit-button');
const buttonCloseEditProfileForm = popup.querySelector('.popup__close');
const formEditProfile = document.querySelector('.popup__form-profile');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__list-title');
const profileJob = document.querySelector('.profile__list-subtitle');
const containerCards = document.querySelector('.element');
const popupAddCard = document.querySelector('.popup_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close_type_mesto');
const formAddCard = document.querySelector('.popup__form_mesto');
const mestoName = formAddCard.querySelector('.popup__text_type_mesto');
const mestoUrl = formAddCard.querySelector('.popup__text_type_url');
const popupViewImage = document.querySelector('.popup_type_image');
const popupViewImageCloseButton = popupViewImage.querySelector('.popup__close_type_img');
const popupEditProfile = document.querySelector('.popup_edit-profile');

//открытие и закрытие попапа
function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEscape);

}

function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEscape);
}

//открытие попапа редактирования с сохранением исход.данных
function openEditProfileForm() {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//сохранение новых данных в попапе редактир.и закрытие попапа
function submitEditProfileForm(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;
    closePopup(popupEditProfile);
}

//цикл обходит массив и для каждого элемента
//создаем новый экземпляр Card,подгот.к публикации и добавляем в дом.
initialCards.forEach((item) => {
    const card = new Card(item, '.element__template');
    const cardElement = card.generationCard();
    containerCards.append(cardElement);
});

//сохранение новой карточки в начало блока и закрытие попапа добавления карточки
function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    closePopup(popupAddCard);
    const newCardData = {
        name: mestoName.value,
        link: mestoUrl.value
    };
    const newElementAdd = new Card(newCardData);
    containerCards.prepend(newElementAdd.generationCard());
    formAddCard.reset();
}

//слушатели событий
//сохранение редактирования профиля
formEditProfile.addEventListener('submit', submitEditProfileForm);

//открытие и закрытие профиля
buttonOpenEditProfileForm.addEventListener('click', openEditProfileForm);
buttonCloseEditProfileForm.addEventListener('click', function () {
    closePopup(popupEditProfile);
});

//открытие и закрытие попапа добавления карточки
popupAddOpenButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});
popupAddCloseButton.addEventListener('click', function () {
    closePopup(popupAddCard);
});

//сохранение новой карточки
formAddCard.addEventListener('submit', handleFormSubmitAdd);

//закрытие картинки во весь экран
popupViewImageCloseButton.addEventListener('click', function () {
    closePopup(popupViewImage);
});

//закрытие попапа по клику на оверлей. 
function closePopupOnOverlay(evt) {
    if (evt.currentTarget == evt.target) {
        closePopup(evt.target);
    };
}
//выбираем все попапы на странице и добавляем слушатель события 
document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('click', closePopupOnOverlay);
});

// закрываем попап нажатием на Esc для попапа с классом opened 
function closePopupOnEscape(evt) {
    if (evt.key == 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
}