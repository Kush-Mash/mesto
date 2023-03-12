export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector; // записали селектор в приватное поле

    this._deleteCard = this._deleteCard.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._handleCardClick = handleCardClick;
  };

  // Метод клонирует и возвращает разметку формы
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.element__mask-group');
    this._cardTitle = this._element.querySelector('.element__title');
    this._buttonLike = this._element.querySelector('.element__group');
    this._buttonTrash = this._element.querySelector('.element__trash');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  };

    _deleteCard() {
      this._element.remove(); // удаляется разметка из html
      this._element = null; // обнуляется сам объект карточки, чтобы не оставаться в памяти приложения и не потреблять ресурсы
    };

    _handleLikeClick() {
      this._buttonLike.classList.toggle('element__group_active');
    };

    _setEventListeners() {
      this._buttonTrash.addEventListener('click', this._deleteCard);
      this._buttonLike.addEventListener('click', this._handleLikeClick);
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link)
      });
    };
  };
