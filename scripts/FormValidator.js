class FormValidator {
  constructor(object, formElement) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._formElement = formElement;

    this._toggleButtonState = this._toggleButtonState.bind(this);
    this._showInputError = this._showInputError.bind(this);
    this._hideInputError = this._hideInputError.bind(this);
    this._isValid = this._isValid.bind(this);
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    errorElement.textContent = errorMessage;
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля
  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // Функция принимает массив полей
  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    })
  };

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  };

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  };

  // Активная/неактивная кнопка
  _toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  };

  _setEventListeners(formElement) {
    // Найдём все поля формы и сделаем из них массив
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState(inputList, buttonElement);

    // при очистке формы
    this._formElement.addEventListener('reset', () => {
      // `setTimeout`, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonElement);
      }, 0); // достаточно 0 миллисекунд, чтобы после `reset` сработало действие
    });

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        this._isValid(this._formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  };


};

export default FormValidator;

import { object } from './constants.js';

//import { disableButton, enableButton } from './index.js';

