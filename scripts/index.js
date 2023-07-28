const popup = document.querySelector('.popup');
const buttonOpenEditProfileForm = document.querySelector('.profile__list-edit-button');
const buttonCloseEditProfileForm = popup.querySelector('.popup__close');
const formEditProfile = document.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__list-title');
const profileJob = document.querySelector('.profile__list-subtitle');
const containerCards = document.querySelector('.element');
const templateElement = document.querySelector('.element__template');
const popupAddCard = document.querySelector('.popup_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close_type_mesto');
const formAddCard = document.querySelector('.popup__form_mesto');
const mestoName = formAddCard.querySelector('.popup__text_type_mesto');
const mestoUrl = formAddCard.querySelector('.popup__text_type_url');
const popupViewImage = document.querySelector('.popup_type_image');
const viewImageContent = popupViewImage.querySelector('.popup__img-content');
const viewImageTitle = popupViewImage.querySelector('.popup__img-title');
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
        viewImageContent.src = element.link;
        viewImageContent.alt = element.name;
        viewImageTitle.textContent = element.name;
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