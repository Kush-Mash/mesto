import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._btnSubmit = this._popup.querySelector('.popup__button');
    // колбэк сабмита формы
    this._handleFormSubmit = handleFormSubmit;
  };

  // Сбор данных всех полей формы
  _getInputValues() {
    // пустой объект
    this._formValues = {};
    // значения всех полей объекта
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  // // Вставляем данные в инпуты (сделать потом)
  // setInputValues(data) {
  //   this._inputList.forEach((input) => {
  //     // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
  //     input.value = data[input.name];
  //   });
  // }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // передаём функции объект значений инпутов
      this._handleFormSubmit(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._popupForm.reset()
  };

  showLoading(isLoading) {
    if (isLoading) {
      this._btnSubmit.textContent = 'Сохранение...';
    } else {
      this._btnSubmit.textContent = 'Сохранить';
    };
  };
};
