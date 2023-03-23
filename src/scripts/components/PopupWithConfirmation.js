import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__input-list');
  };

  // func - колбек на удаление карточки
  updateSubmitHandler(func) {
    this._handleSubmit = func;
  };

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }


}