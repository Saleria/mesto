const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__list-edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__text_type_name');
const jobInput = formElement.querySelector('.popup__text_type_job');
const title = document.querySelector('.profile__list-title');
const subtitle = document.querySelector('.profile__list-subtitle');

//функция открытия и закрытия попапа
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

formElement.addEventListener('submit', handleFormSubmit);
popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupToggle);


//добавляем 6 карточек при загрузке  страницы
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

const containerElement = document.querySelector('.element');
const templateElement = document.querySelector('.element__template');

// удаление карточки.  возвращаем родительский класс у li,  удаляем его
function deleteEl(evt) {
    const itemDelete = evt.target.closest('.element__item');
    itemDelete.remove(); 
}

// пишем template- сщздаем функцию, которая 
//принимает данные: копирует темплейт со всей вложенностью
function createdTemplate(element) {
    const el = templateElement.content.cloneNode(true);
    el.querySelector('.element__item-title').textContent = element.name;
    el.querySelector('.element__item-img').src = element.link;
    //лайк карточки: обработчик клика + переключение класса
    el.querySelector('.element__item-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__item-button_active');
    });

    // навешиваем слушатель: удали по клику с помощью функции deleteEl
    el.querySelector('.element__item-delete').addEventListener('click', deleteEl);
    
    containerElement.append(el);

    return containerElement;
};

//создаем функцию,  
//перебираем каждый эл-т массива,  ,вызываем ее, 
const render = () => {
    initialCards.forEach(createdTemplate)
};

render();


const popupAdd = document.querySelector('.popup_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close_type_mesto');
//const mestoName = popupAdd.querySelector('.popup__text_type_mesto'); 
//const mestoUrl = popupAdd.querySelector('.popup__text_type_url'); 
//const elementTitle = document.querySelector('.element__item-title');
//const elementImg = document.querySelector('.element__item-img'); 

//создаем функцию для добавления класса к новому! попапу по новому классу. 
//этот класс только у попапа добавления карточек
const popupAddToggle = function () {
    popupAdd.classList.toggle('popup_opened');
}

// навешиваем слушатели по клику - удали/добавь класс открывающий попап
popupAddOpenButton.addEventListener('click', popupAddToggle);
popupAddCloseButton.addEventListener('click', popupAddToggle);
