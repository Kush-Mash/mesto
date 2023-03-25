export default class Card {
  constructor({data, currentUserId, handleCardClick, handleAddLike, handleDelLike, handleTrashClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = currentUserId; // id пользователя сейчас
    this._owner = data.owner._id; // id хозяина карточки
    this._likes = data.likes;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleAddLike = handleAddLike;
    this._handleDelLike = handleDelLike;
    this._handleTrashClick = handleTrashClick;
  };

  // Клонировать и вернуть разметку формы
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };

  getId() {
    return this._id;
  }

  // убирает корзину с чужих карточек
  _checkDeletion() {
    if (this._owner !== this._userId) {
       this._buttonTrash.remove();
       this._buttonTrash = null;
    }
  }

  deleteCard() {
    this._element.remove(); // удаляется разметка из html
    this._element = null; // обнуляется сам объект карточки, чтобы не оставаться в памяти приложения и не потреблять ресурсы
  };

  // ставит/убирает <З
  _checkReactions() {
    if (this._buttonLike.classList.contains('element__group_active')) {
      this._handleDelLike(this._id);
    } else {
      this._handleAddLike(this._id);
    }
  }

  handleLikeClick(data) {
    this._likes = data.likes;
    this._buttonLike.classList.toggle('element__group_active');
    this._likesCounter.textContent = this._likes.length;
  };

  _likeUser() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._buttonLike.classList.add('element__group_active');
   }
  }

  _setEventListeners() {
    this._buttonTrash.addEventListener('click', () => {
      this._handleTrashClick();
    });
    this._buttonLike.addEventListener('click', () => {
      this._checkReactions();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  };

      // Наполнить темплейт содержимым
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.element__mask-group');
    this._cardTitle = this._element.querySelector('.element__title');
    this._buttonLike = this._element.querySelector('.element__group');
    this._buttonTrash = this._element.querySelector('.element__trash');
    this._likesCounter = this._element.querySelector('.element__counter');

    this._likesCounter.textContent = this._likes.length;
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // if (!this._isOwner) {
    //   this._element.querySelector('.popup__close-button').remove();
    // };

    this._setEventListeners();
    // this._checkReactions();
    this._checkDeletion();
    // this._likeUser();

    return this._element;
  };
};
