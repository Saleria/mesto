//export { openPopup };
import Card from "./Card.js";
import FormValidator from './FormValidator.js';
import { initialCards } from './constants.js';
import { validationSettings } from './FormValidator.js';
import Section from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from './UserInfo.js'

const popup = document.querySelector('.popup');
const buttonOpenEditProfileForm = document.querySelector('.profile__list-edit-button');
const formEditProfile = document.querySelector('.popup__form-profile');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__list-title');
const profileJob = document.querySelector('.profile__list-subtitle');
const containerCards = document.querySelector('.element');
const popupAddCard = document.querySelector('.popup_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup__form_mesto');
const mestoName = formAddCard.querySelector('.popup__text_type_mesto');
const mestoUrl = formAddCard.querySelector('.popup__text_type_url');
//const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeButtons = document.querySelectorAll('.popup__close');

const popupEditProfile = new Popup('.popup_edit-profile');

const userInfo = new UserInfo(
    {
        nameSelector: '.profile__list-title',
        infoSelector: '.profile__list-subtitle'
    }
);
//открытие попапа редактирования с сохранением исход.данных
//очищаем поля ввода от ошибок
function openEditProfileForm() {
    popupEditProfile.open();
    const elementInfo = userInfo.getUserInfo();
    nameInput.value = elementInfo.user;
    jobInput.value = elementInfo.info;
    validateEditForm.resetValidation()
}

//открытие папопа профиля
buttonOpenEditProfileForm.addEventListener('click', openEditProfileForm);

//сохранение новых данных в попапе редактир.и закрытие попапа
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo({ user: nameInput.value, info: jobInput.value });
    popupEditProfile.close();
}
);

popupEditProfile.setEventListeners();

const popupViewImage = new PopupWithImage('.popup_type_image');

const handleCardClick = (name, link) => {
    popupViewImage.open(name, link);
}
popupViewImage.setEventListeners();

//функция возвращает готовую карточку со всеми обработчиками
function createCard(item) {
    const card = new Card(item, '.element__template', handleCardClick);
    const cardElement = card.generationCard();
    return cardElement;
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
    }
}, '.element');

cardList.renderItems();

//создаем каждой форме экземпляр класса
//и запускаем валидацию для каждой формы отдельно

const validateAddForm = new FormValidator(validationSettings, formAddCard);
validateAddForm.enableValidation();

const validateEditForm = new FormValidator(validationSettings, formEditProfile);
validateEditForm.enableValidation();

//сохранение новой карточки в начало блока и закрытие попапа добавления карточки
//создаем новый экземпляр класса и вызываем публ.функцию создания карточки 
function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    const newCardData = ({ name: mestoName.value, link: mestoUrl.value });
    closePopup(popupAddCard);
    containerCards.prepend(createCard(newCardData));
    formAddCard.reset();
    validateAddForm.changeButtonState();
}

//слушатели событий


//открытие попапа добавления карточки
//очищаем поля ввода от ошибок и сбрасываем ранее введенные значения
popupAddOpenButton.addEventListener('click', function () {
    openPopup(popupAddCard);
    validateAddForm.resetValidation();
    formAddCard.reset();
});

//сохранение новой карточки
formAddCard.addEventListener('submit', handleFormSubmitAdd);