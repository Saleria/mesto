export { openPopup };
import Card from "./Card.js";
import FormValidator from './FormValidator.js';
import { initialCards } from './constants.js';
import { validationSettings } from './FormValidator.js';

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
const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeButtons = document.querySelectorAll('.popup__close');

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
//очищаем поля ввода от ошибок
function openEditProfileForm() {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    validateEditForm.resetValidation()
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

//функция возвращает готовую карточку со всеми обработчиками
function createCard(item) {
    const card = new Card(item, '.element__template');
    const cardElement = card.generationCard();
    return cardElement;
}

initialCards.forEach((item) => {
    containerCards.append(createCard(item));
});

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
//сохранение редактирования профиля
formEditProfile.addEventListener('submit', submitEditProfileForm);

//открытие папопа профиля
buttonOpenEditProfileForm.addEventListener('click', openEditProfileForm);

//открытие попапа добавления карточки
//очищаем поля ввода от ошибок и сбрасываем ранее введенные значения
popupAddOpenButton.addEventListener('click', function () {
    openPopup(popupAddCard);
    validateAddForm.resetValidation();
    formAddCard.reset();
});

//сохранение новой карточки
formAddCard.addEventListener('submit', handleFormSubmitAdd);

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

// функция закрытия попапов
//находим ближайший к "крестику" попап и вызываем функцию закрытия попапа
closeButtons.forEach((btn) => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', function () {
        closePopup(popup);
    });
})