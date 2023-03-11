import { validationConfig } from '../utils/constants.js';

export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(validationConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(validationConfig.submitButtonSelector);

    this._showInputError = this._showInputError.bind(this);
    this._hideInputError = this._hideInputError.bind(this);
    this._toggleInputErrorState = this._toggleInputErrorState.bind(this);
  };

  // Функция, которая добавляет класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    errorElement.textContent = errorMessage;
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля
  _toggleInputErrorState(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Функция вернёт true если хотя бы одно поле невалидно
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  // Активная/неактивная кнопка
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  _setEventListeners() {
    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState();

    // при очистке формы
    this._formElement.addEventListener('reset', () => {
      // `setTimeout`, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._toggleButtonState();
      }, 0); // достаточно 0 миллисекунд, чтобы после `reset` сработало действие
    });

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  };

  // Запускаем валидацию
  enableValidation() {
      this._setEventListeners();
  };
};
