import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picture = this._popup.querySelector('.popup__picture');
    this._pictureName = this._popup.querySelector('.popup__picture-name');
  };

  open(data) {
    super.open();
    this._picture.src = data.link;
    this._picture.alt = `Фотография места ${data.name}`;
    this._pictureName.textContent = data.name;
  }
}
