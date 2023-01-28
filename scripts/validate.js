// Функция, которая добавляет класс с ошибкой
const showInputError = (element, errorMessage) => {
  element.classList.add('popup__input_type_error');
  // Показываем сообщение об ошибке
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  // Очистим ошибку
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!nameInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(nameInput, nameInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(nameInput);
  }
};

// Вызовем функцию isValid на каждый ввод символа
nameInput.addEventListener('input', isValid);

// enableValidation ({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
