import './index.css'; 
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/constants.js';
import { validationSettings } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from '../components/UserInfo.js'
import {buttonOpenEditProfileForm,
    formEditProfile,
    nameInput,
    jobInput,
    popupAddOpenButton,
    formAddCard} from '../utils/constants.js';

//создаем экземпляр класса, передаем селекторы
const userInfo = new UserInfo(
    {
        nameSelector: '.profile__list-title',
        infoSelector: '.profile__list-subtitle'
    }
);

//создаем экземпляр класса попап редактир.профиля
const popupEditProfile = new PopupWithForm('.popup_edit-profile',
    (data) => {
        userInfo.setUserInfo({ name: data['text-name'], info: data['job-name'] });
        popupEditProfile.close();
    }
);

//открытие попапа редактирования с сохранением исход.данных
//очищаем поля ввода от ошибок
function openEditProfileForm() {
    popupEditProfile.open();
    const elementInfo = userInfo.getUserInfo();
    nameInput.value = elementInfo.name;
    jobInput.value = elementInfo.info;
    validateEditForm.resetValidation()
}

popupEditProfile.setEventListeners();

//открытие папопа профиля
buttonOpenEditProfileForm.addEventListener('click', openEditProfileForm);

//попап добавления карточки
const popupAddCard = new PopupWithForm('.popup_add',
    (data) => {
        const newCardData = {name: data['mesto-name'], link: data['url']};
        cardList.addItem(createCard(newCardData));
        popupAddCard.close();
    }
);

//открытие попапа добавления карточки
//очищаем поля ввода от ошибок и сбрасываем ранее введенные значения
popupAddOpenButton.addEventListener('click', function () {
    popupAddCard.open();
    validateAddForm.resetValidation();
    formAddCard.reset();
    validateAddForm.changeButtonState();
});

popupAddCard.setEventListeners();

//попап просмотра карточки
const popupViewImage = new PopupWithImage('.popup_type_image');
popupViewImage.setEventListeners();

const handleCardClick = (name, link) => {
    popupViewImage.open(name, link);
}

//функция возвращает готовую карточку
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