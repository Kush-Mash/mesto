import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmDelete) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form_modify_confirm');
    this._cardObject = {};
    this._handleConfirmDelete = handleConfirmDelete;
  };

  open(card) {
    super.open();
    this._cardObject = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleConfirmDelete(this._cardObject);
    });
  }
}
