import './index.css';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/constants.js';
import { validationSettings } from '../utils/constants.js';
import Section from '../components/Section.js';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from '../components/UserInfo.js'
import {
    buttonOpenEditProfileForm,
    formEditProfile,
    nameInput,
    jobInput,
    popupAddOpenButton,
    formAddCard
} from '../utils/constants.js';
import { PopupDelete } from '../components/PopupDelete';
import { Api } from '../components/Api';

//создаем каждой форме экземпляр класса
//и запускаем валидацию для каждой формы отдельно

const validateAddForm = new FormValidator(validationSettings, formAddCard);
validateAddForm.enableValidation();

const validateEditForm = new FormValidator(validationSettings, formEditProfile);
validateEditForm.enableValidation();

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
    renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
    }
}, '.element');

//cardList.renderItems();

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
        authorization: 'ea163726-b6bd-4665-810a-f0a3a6a3d99f',
        'content-type': 'application/json'
    }
});

let userId;

//получаем данные с сервера (инфо и начальные карточки)
//Promise.all принимает массив с промисами и затем выполняет код
const promises = [api.getUserInfo(), api.getInitialCards()];
Promise.all(promises)
    .then(([userData, initialCardsData]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        cardList.renderItems(initialCardsData, userData);
    })
    .catch((error) => {
        console.log(error);
    });

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
        api.changeUserInfo({
            name: data['text-name'],
            about: data['job-name']
        })
            .then(() => {
                userInfo.setUserInfo(
                    {
                        name: data['text-name'],
                        about: data['job-name']
                    });
                popupEditProfile.close();
            })
            .catch((error) => {
                console.log(error);
            });
    });

//открытие попапа редактирования с сохранением исход.данных
//очищаем поля ввода от ошибок
function openEditProfileForm() {
    popupEditProfile.open();
    const elementInfo = userInfo.getUserInfo();
    nameInput.value = elementInfo.name;
    jobInput.value = elementInfo.about;
    validateEditForm.resetValidation();
    validateEditForm.enableButtonSave(); 
};

popupEditProfile.setEventListeners();

//открытие папопа профиля
buttonOpenEditProfileForm.addEventListener('click', openEditProfileForm);

//попап просмотра карточки
const popupViewImage = new PopupWithImage('.popup_type_image');
popupViewImage.setEventListeners();



//попап добавления карточки
const popupAddCard = new PopupWithForm('.popup_add',
    (data) => {
        api.addNewCard({
            name: data['mesto-name'],
            link: data['url']
        })
            .then((data) => {
                cardList.addItem(createCard(data));
                popupAddCard.close();
            })
            //const newCardData = { name: data['mesto-name'], link: data['url'] };
            //cardList.addItem(createCard(newCardData));
            .catch((error) => {
                console.log(error);
            })
    }
);

//открытие попапа добавления карточки
//очищаем поля ввода от ошибок и сбрасываем ранее введенные значения
popupAddOpenButton.addEventListener('click', function () {
    popupAddCard.open();
    validateAddForm.resetValidation();
});

popupAddCard.setEventListeners();