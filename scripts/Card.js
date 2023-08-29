import { openPopup } from './index.js';
import { initialCards } from './constants.js';

class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._teplateSelector = templateSelector;
    }

    //подготавливаем карточку
    _getTemplate() {
        const cardElement = document
            .querySelector('.element__template')
            .content
            .querySelector('.element__item')
            .cloneNode(true);
        return cardElement;
    }

    //добавляем в разметку данные и размещаем в дом
    generationCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__item-img').src = this._link;
        this._element.querySelector('.element__item-title').textContent = this._name;
        this._element.querySelector('.element__item-img').alt = this._name;

        return this._element;
    }

    _likeCard() {
        this._buttonLike.classList.toggle('element__item-button_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    _openViewImagePopup() {
        const popupViewImage = document.querySelector('.popup_type_image');
        const viewImageContent = popupViewImage.querySelector('.popup__img-content');
        const viewImageTitle = popupViewImage.querySelector('.popup__img-title');
        openPopup(popupViewImage);
        viewImageContent.src = this._link;
        viewImageContent.alt = this._name;
        viewImageTitle.textContent = this._name;
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

        this._element.querySelector('.element__item-img').addEventListener('click', () => {
            this._openViewImagePopup();
        });
    }
}

//цикл обходит массив и для каждого элемента
//создаем новый экземпляр Card,подгот.к публикации и добавляем в дом.
initialCards.forEach((item) => {
    const card = new Card(item, '.element__template');
    const cardElement = card.generationCard();
    document.querySelector('.element').append(cardElement);
});

export default Card;