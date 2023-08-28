import {openPopup} from './index.js'; 

class Card {
    constructor(data, templateSelector) {
        this._title = data.name;
        this._image = data.link;
        this._teplateSelector = templateSelector;
        this._element = this._getTemplate();
    }

    //подготавливаем карточку
    _getTemplate() {
        const cardElement = document
            .querySelector(this._teplateSelector)
            .content
            .querySelector('.element__item')
            .cloneNode(true);
        return cardElement;        
    }
    
    //добавляем в разметку данные и размещаем в дом
    generationCard() {
        this._setEventListeners();        
        this._element.querySelector('.element__item-img').src = this._image;
        this._element.querySelector('.element__item-title').textContent = this._title;
        this._element.querySelector('.element__item-img').alt = this._title;
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
        viewImageContent.src = this._image;
        viewImageContent.alt = this._title;
        viewImageTitle.textContent = this._title;
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

        this._element.querySelector('.element__item-img').addEventListener ('click', () => {
            this._openViewImagePopup(); 
        });
    }
}



export default Card;