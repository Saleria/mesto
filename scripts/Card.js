import { openPopup } from './index.js';

class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;        
    }

    //подготавливаем карточку
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element__item')
            .cloneNode(true);
        return cardElement;
    }

    //добавляем в разметку данные и размещаем в дом
    generationCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__item-img');
        this._setEventListeners();

        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__item-title').textContent = this._name;
        return this._element;
    }

    _likeCard() {
        this._buttonLike.classList.toggle('element__item-button_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    _openViewImagePopup() {
        openPopup(this._popupViewImage);
        this._viewImageContent.src = this._link;
        this._viewImageContent.alt = this._name;
        this._viewImageTitle.textContent = this._name;
    }

    //слушатели событий
    _setEventListeners() {
        this._buttonLike = this._element.querySelector('.element__item-button');
        this._buttonLike.addEventListener('click', () => {
            this._likeCard();
        });

        this._buttonDelete = this._element.querySelector('.element__item-delete');
        this._buttonDelete.addEventListener('click', () => {
            this._deleteCard();
        });

        this._popupViewImage = document.querySelector('.popup_type_image');
        this._viewImageContent = this._popupViewImage.querySelector('.popup__img-content');
        this._viewImageTitle = this._popupViewImage.querySelector('.popup__img-title');
        this._elementImage.addEventListener('click', () => {
            this._openViewImagePopup();
        });
    }
}



export default Card;