const popup = document.querySelector('.popup');
const buttonOpenEditProfileForm = document.querySelector('.profile__list-edit-button');
const formEditProfile = document.querySelector('.popup__form-profile');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_job');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup__form_mesto');
const formProfileAvatar = document.querySelector('.popup__form_avatar');
const buttonOpenEditAvatar = document.querySelector('.profile__avatar-edit-button');

export {
    buttonOpenEditProfileForm,
    formEditProfile,
    nameInput,
    jobInput,
    popupAddOpenButton,
    formAddCard,
    formProfileAvatar,
    buttonOpenEditAvatar
}; 

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message'
};