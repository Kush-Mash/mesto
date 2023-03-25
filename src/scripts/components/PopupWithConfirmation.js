import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmDelete) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._cardObject = {};
    this.handleConfirmDelete = handleConfirmDelete;
  };

  open(card) {
    super.open();
    this._cardObject = card;
  }

  // handleConfirmDelete(callback) {
  //   this._handleConfirmCallback = callback;
  // }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this.handleConfirmDelete(this._cardObject);
    });
  }
}
