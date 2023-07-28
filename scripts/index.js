const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__list-edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__text_type_name');
const jobInput = formElement.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__list-title');
const profileJob = document.querySelector('.profile__list-subtitle');
const containerCards = document.querySelector('.element');
const templateElement = document.querySelector('.element__template');
const popupAddCard = document.querySelector('.popup_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close_type_mesto');
const formNewMesto = document.querySelector('.popup__form_mesto');
const mestoName = formNewMesto.querySelector('.popup__text_type_mesto');
const mestoUrl = formNewMesto.querySelector('.popup__text_type_url');
const sbmtAddBtn = formNewMesto.querySelector('.popup__save-button_type_mesto');
const popupViewImage = document.querySelector('.popup_type_image');
const ViewImageContent = popupViewImage.querySelector('.popup__img-content');
const ViewImageTitle = popupViewImage.querySelector('.popup__img-title');
const popupViewImageCloseButton = popupViewImage.querySelector('.popup__close_type_img');
const popupEditProfile = document.querySelector('.popup_edit-profile');

//открытие и закрытие попапа
function closePopup(item) {
    item.classList.remove('popup_opened');
}

function openPopup(item) {
    item.classList.add('popup_opened');
}

//открытие попапа редактирования с сохранением исход.данных
function openProfile() {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//сохранение новых данных в попапе редактир.и закрытие попапа
function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;
    closePopup(popupEditProfile);
}

//удаление карточек
function deleteCard(evt) {
    const itemDelete = evt.target.closest('.element__item');
    itemDelete.remove();
}

const renderInitialCards = () => {
    initialCards.forEach((element) => {
        containerCards.append(createdTemplate(element));
    });
};

renderInitialCards();

//темплейт: копируем содержимое карточки,передаем данные
function createdTemplate(element) {
    const card = templateElement.content.cloneNode(true);
    const cardImage = card.querySelector('.element__item-img');
    card.querySelector('.element__item-title').textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;

    //лайк
    card.querySelector('.element__item-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__item-button_active');
    });

    //слушатель на удаление
    card.querySelector('.element__item-delete').addEventListener('click', deleteCard);

    //слушатель и функция открытия картинки во весь экран
    cardImage.addEventListener('click', function () {
        openPopup(popupViewImage);
        ViewImageContent.src = element.link;
        ViewImageContent.alt = element.name;
        ViewImageTitle.textContent = element.name;
    });

    return card;
};

//сохранение новой карточки в начало блока и закрытие попапа добавления карточки
function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    const addNewElement = createdTemplate({ name: mestoName.value, link: mestoUrl.value });
    mestoName.value = '';
    mestoUrl.value = '';
    closePopup(popupAddCard);
    containerCards.prepend(addNewElement);
}

//слушатели событий
//сохранение редактирования профиля
formElement.addEventListener('submit', handleFormSubmit);
//открытие и закрытие профиля
popupOpenButton.addEventListener('click', openProfile);
popupCloseButton.addEventListener('click', function () {
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
formNewMesto.addEventListener('submit', handleFormSubmitAdd);
//закрытие картинки во весь экран
popupViewImageCloseButton.addEventListener('click', function () {
    closePopup(popupViewImage);
}); 