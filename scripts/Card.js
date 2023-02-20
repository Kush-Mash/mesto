class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector; // записали селектор в приватное поле

    this._deleteCard = this._deleteCard.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

    _deleteCard() {
      this._element.remove();
    }

    _handleLikeClick() {
      this._element.querySelector('.element__group').classList.toggle('element__group_active');
    }

    _setEventListeners() {
      this._element.querySelector('.element__trash').addEventListener('click', this._deleteCard);
      this._element.querySelector('.element__group').addEventListener('click', this._handleLikeClick);
      this._element.querySelector('.element__mask-group').addEventListener('click', () => {
        this._handleCardClick(this._name, this._link)
      });
    }

    createCard() {
      // Запишем разметку в приватное поле _element.
      // Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();

      this._element.querySelector('.element__mask-group').src = this._link;
      this._element.querySelector('.element__mask-group').alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;

      this._setEventListeners();

      return this._element;
    }
  }

export default Card;

import { handleCardClick } from './index.js'

import { initialCards } from './constants.js'
