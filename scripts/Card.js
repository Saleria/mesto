class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick; 
        //this._popupViewImage = document.querySelector('.popup_type_image');
        //this._viewImageContent = this._popupViewImage.querySelector('.popup__img-content');
        //this._viewImageTitle = this._popupViewImage.querySelector('.popup__img-title');
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

    //добавляем в разметку данные
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

        
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}

export default Card;