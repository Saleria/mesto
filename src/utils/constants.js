export const initialCards = [
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

const popup = document.querySelector('.popup');
const buttonOpenEditProfileForm = document.querySelector('.profile__list-edit-button');
const formEditProfile = document.querySelector('.popup__form-profile');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_job');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup__form_mesto');

export {
    buttonOpenEditProfileForm,
    formEditProfile,
    nameInput,
    jobInput,
    popupAddOpenButton,
    formAddCard
}; 