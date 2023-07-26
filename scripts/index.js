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

const popupToggle = function () {
    popup.classList.toggle('popup_opened');
}

function popupOpen() {
    popupToggle();
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    title.textContent = nameValue;
    subtitle.textContent = jobValue;
    popupToggle();
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

function deleteEl(evt) {
    const itemDelete = evt.target.closest('.element__item');
    itemDelete.remove();
}

const render = () => {
    initialCards.forEach((element) =>{
        containerElement.append(createdTemplate(element));
    });        
};

render();

function createdTemplate(element) {
    const el = templateElement.content.cloneNode(true);
    el.querySelector('.element__item-title').textContent = element.name;
    el.querySelector('.element__item-img').src = element.link;
    el.querySelector('.element__item-img').alt = element.name;

    el.querySelector('.element__item-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__item-button_active');
    });

    el.querySelector('.element__item-delete').addEventListener('click', deleteEl);
    
    el.querySelector('.element__item-img').addEventListener('click', popupImgOpen);

    return el;
};

const popupAddToggle = function () {
    popupAdd.classList.toggle('popup_opened');
}

function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    const addNewElement = createdTemplate({name: mestoName.value, link: mestoUrl.value });
    mestoName.value = ''; 
    mestoUrl.value = ''; 
    popupAddToggle();
    containerElement.prepend(addNewElement);    
}
 
const popupImgToggle = function () {
    popupImg.classList.toggle('popup_opened');
}

function popupImgOpen() {
    popupImgToggle();
    contentImg.src = this.src;
    titleImg.textContent = this.alt;
}  

formElement.addEventListener('submit', handleFormSubmit);
popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupToggle);
popupAddOpenButton.addEventListener('click', popupAddToggle);
popupAddCloseButton.addEventListener('click', popupAddToggle);
formMesto.addEventListener('submit', handleFormSubmitAdd);
popupImgClose.addEventListener('click', popupImgToggle); 