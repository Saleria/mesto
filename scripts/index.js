const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__list-edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__text_type_name');
const jobInput = formElement.querySelector('.popup__text_type_job');
const title = document.querySelector('.profile__list-title');
const subtitle = document.querySelector('.profile__list-subtitle');
const containerElement = document.querySelector('.element');
const templateElement = document.querySelector('.element__template');
const popupAdd = document.querySelector('.popup_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close_type_mesto');
const formMesto = document.querySelector('.popup__form_mesto');
const mestoName = formMesto.querySelector('.popup__text_type_mesto');
const mestoUrl = formMesto.querySelector('.popup__text_type_url');
const sbmtAddBtn = formMesto.querySelector('.popup__save-button_type_mesto');
const popupImg = document.querySelector('.popup_type_image');
const contentImg = popupImg.querySelector('.popup__img-content');
const titleImg = popupImg.querySelector('.popup__img-title');
const itemImg = document.querySelector('.element__photo');
const itemTitle = document.querySelector('.element__photo-title');
const popupImgClose = popupImg.querySelector('.popup__close_type_img');
const popupEditProfile = document.querySelector('.popup_edit-profile');

//открытие и закрытие попапа
function closePopup(item) {
    item.classList.remove('popup_opened');
}

function openPopup(item) {
    item.classList.add('popup_opened');
}

//открытие попапа редактирования с сохранением исход.данных
function openProfilePopup() {
    openPopup(popupEditProfile);
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

//сохранение новых данных в попапе редактир.и закрытие попапа
function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    title.textContent = nameValue;
    subtitle.textContent = jobValue;
    closePopup(popupEditProfile);
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//удаление карточек
function deleteEl(evt) {
    const itemDelete = evt.target.closest('.element__item');
    itemDelete.remove();
}

const renderInitialCards = () => {
    initialCards.forEach((element) => {
        containerElement.append(createdTemplate(element));
    });
};

renderInitialCards();

//темлпейт
function createdTemplate(element) {
    const el = templateElement.content.cloneNode(true);
    const elementImg = el.querySelector('.element__item-img');
    el.querySelector('.element__item-title').textContent = element.name;
    elementImg.src = element.link;
    elementImg.alt = element.name;

//лайк
    el.querySelector('.element__item-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__item-button_active');
    });

//слушатель на удаление
    el.querySelector('.element__item-delete').addEventListener('click', deleteEl);

//слушатель открытия картинки во весь экран
    elementImg.addEventListener('click', function(){
        openPopup(popupImg);
        contentImg.src = element.link;
        contentImg.alt = element.name; 
        titleImg.textContent = element.name;
    });

    return el;
};

//сохранение новой карточки в начало блока и закрытие попапа добавления карточки
function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    const addNewElement = createdTemplate({ name: mestoName.value, link: mestoUrl.value });
    mestoName.value = '';
    mestoUrl.value = '';
    closePopup(popupAdd);
    containerElement.prepend(addNewElement);
}

//слушатели событий
//сохранение редактирования профиля
formElement.addEventListener('submit', handleFormSubmit);
//открытие и закрытие профиля
popupOpenButton.addEventListener('click', openProfilePopup);
popupCloseButton.addEventListener('click', function(){
    closePopup(popupEditProfile);
});
//открытие и закрытие попапа добавления карточки
popupAddOpenButton.addEventListener('click', function(){
    openPopup(popupAdd); 
});
popupAddCloseButton.addEventListener('click', function(){
    closePopup(popupAdd); 
});
//сохранение новой карточки
formMesto.addEventListener('submit', handleFormSubmitAdd);
//закрытие картинки во весь экран
popupImgClose.addEventListener('click', function(){
    closePopup(popupImg); 
}); 