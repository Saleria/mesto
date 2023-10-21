class Card {
    constructor(data, templateSelector, handleCardClick, userId, handleCardDelete, handleCardLike) {
        this.data = data;
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;        
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
        this._buttonDelete = this._element.querySelector('.element__item-delete');
        this._buttonLike = this._element.querySelector('.element__item-button');
        this._likeCounter = this._element.querySelector('.element__item-quantity');
        this._setEventListeners();
        this._showButtonDelete();

        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__item-title').textContent = this._name;
        return this._element;
    }

    getId() {
        return this._id;
    }

    // лайки 
    _likeCard() {
        this._buttonLike.classList.add('element__item-button_active');
    }

    _dislikeCard() {
        this._buttonLike.classList.remove('element__item-button_active');
    }

    isLiked() {
        return this._likes.some((item) => {
            return item._id === this._userId
        });
    }

    setLikeState(data) {     
        this._likes = data.likes;   
        this._likeCounter.textContent = this._likes.length;
        if (this.isLiked()) {
            this._likeCard();
        } else {
            this._dislikeCard();
        }
    }

    deleteCard() {
        this._element.remove();
    }

    //скрываем корзину у чужих карточек
    _showButtonDelete() {
        if (this._userId !== this._ownerId) {
            this._buttonDelete.style.display = 'none'
        }
    }

    //слушатели событий
    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            if (this._buttonLike.classList.contains('element__item-button_active'))
            {this._handleCardLikeDelete(this);
            } else {
                this._handleCardLike(this); 
            }
        });

        this._buttonDelete.addEventListener('click', () => {
            this._handleCardDelete(this._id, this);
        });


        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}

export default Card;