const buttonEdit = document.querySelector('.profile__edit-button');
const popupUserInfo = document.querySelector('.popup_modify_user-info');
const buttonCloseUserInfo = popupUserInfo.querySelector('.popup__close-button_modify_user-info');
const popupFormUser = popupUserInfo.querySelector('.popup__form_modify_user-info');
const nameInput = popupUserInfo.querySelector('.popup__input_type_name');
const jobInput = popupUserInfo.querySelector('.popup__input_type_job');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const popupNewPlace = document.querySelector('.popup_modify_new-place');
const buttonAdd = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__box');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
const buttonCloseNewPlace = popupNewPlace.querySelector('.popup__close-button_modify_new-place');
const popupFormPlace = popupNewPlace.querySelector('.popup__form_modify_new-place');
const titlePlaceInput = popupNewPlace.querySelector('.popup__input_type_title-place');
const linkPlaceInput = popupNewPlace.querySelector('.popup__input_type_link-place');
const popupImage = document.querySelector('.popup-image');
const buttonClosePicture = popupImage.querySelector('.popup-image__close-button');
const picture = popupImage.querySelector('.popup-image__picture');
const pictureName = popupImage.querySelector('.popup-image__name');
const formError = document.querySelector(`.${nameInput.id}-error`);

function openPopup (popupVariant) {
  popupVariant.classList.add('popup_opened');
  addEventListener('keydown', closePopupEsc);
}

function closePopup (popupVariant) {
  removeEventListener('keydown', closePopupEsc);
  popupVariant.classList.remove('popup_opened');
};

function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// function closePopupEsc (evt) {
//   if (evt.key === 'Escape') {
//     if (popupNewPlace.classList.contains('popup_opened')) {
//       closePopup(popupNewPlace);
//     }
//     if (popupUserInfo.classList.contains('popup_opened')) {
//       closePopup(popupUserInfo);
//     }
//   }
// };

// Отправка формы с данными профиля
function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupUserInfo);
}

// Функция удаления карточки (корзина)
function ejectCard (card) {
  const buttonDelete = card.querySelector('.element__trash');
  const deleteCard = () => {
    card.remove();
  }
  buttonDelete.addEventListener('click', deleteCard);
}

// Обработчик клика на кнопку-сердечко
function handleLikeClick(evt) {
  evt.target.classList.toggle('element__group_active'); // если класса нет - добавляем, если есть - убираем
}

function likeCard (card) {
  const buttonLike = card.querySelector('.element__group');
  buttonLike.addEventListener('click', handleLikeClick);
}

// Функция составления карточки из template и слушатели её элементов
function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.element__title');
  const cardPhoto = card.querySelector('.element__mask-group');

  cardName.textContent = cardData.name;
  cardPhoto.src = cardData.link;
  cardPhoto.alt = `Фотография места ${cardData.name}`;

  ejectCard(card);
  likeCard(card);

  cardPhoto.addEventListener('click', () => {
    openPopup(popupImage);
    picture.src = cardData.link;
    pictureName.textContent = cardData.name;
    picture.alt = `Фотография места ${cardData.name}`;
  });

  return card;
}

// Отправка формы с данными новой карточки через использование createCard
function submitCard (evt) {
  evt.preventDefault();
  const objNewPlace = {name: titlePlaceInput.value, link: linkPlaceInput.value}
  cardsContainer.prepend(createCard(objNewPlace));
  closePopup(popupNewPlace);
  popupFormPlace.reset();
}

// Вставка в шаблон из массива
function renderCards() {
  initialCards.forEach(item => {
    const readyCard = createCard(item);
    cardsContainer.append(readyCard);
  });
}

// // Функция, которая добавляет класс с ошибкой
// const showInputError = (formElement, inputElement, errorMessage) => {
//   // Находим элемент ошибки внутри самой функции
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('popup__input_type_error');
//   // Показываем сообщение об ошибке
//   errorElement.textContent = errorMessage;
//   // errorElement.classList.add('popup__input-error_active');
// };

// // Функция, которая удаляет класс с ошибкой
// const hideInputError = (formElement, inputElement) => {
//   // Находим элемент ошибки
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('popup__input_type_error');
//   errorElement.textContent = '';
// };

// // Функция, которая проверяет валидность поля
// const isValid = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     // Если поле не проходит валидацию, покажем ошибку
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     // Если проходит, скроем
//     hideInputError(formElement, inputElement);
//   }
// };

// // // Вызовем функцию isValid на каждый ввод символа
// // nameInput.addEventListener('input', isValid);

// const setEventListeners = (formElement) => {
//   // Найдём все поля формы и сделаем из них массив
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   // Найдём в текущей форме кнопку отправки
//   const buttonElement = formElement.querySelector('.popup__button');

//   // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
//   toggleButtonState(inputList, buttonElement);

//   // Обойдём все элементы полученной коллекции
//   inputList.forEach((inputElement) => {
//     // каждому полю добавим обработчик события input
//     inputElement.addEventListener('input', () => {
//       // Внутри колбэка вызовем isValid,
//       // передав ей форму и проверяемый элемент
//       isValid(formElement, inputElement)

//       // Вызовем toggleButtonState и передадим ей массив полей и кнопку
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = () => {
//   // Найдём все формы с указанным классом в DOM,
//   // сделаем из них массив методом Array.from
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   const popupOpened = document.querySelector('.popup_opened');

//   // Переберём полученную коллекцию
//   formList.forEach((formElement) => {
//     // Для каждой формы вызовем функцию setEventListeners,
//     // передав ей элемент формы
//     setEventListeners(formElement);
//   });
// };

// // Функция принимает массив полей
// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//     // Если поле не валидно, колбэк вернёт true
//     // Обход массива прекратится и вся функция
//     // hasInvalidInput вернёт true

//     return !inputElement.validity.valid;
//   })
// };

// // Функция принимает массив полей ввода
// // и элемент кнопки, состояние которой нужно менять
// const toggleButtonState = (inputList, buttonElement) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//     buttonElement.classList.add('popup__button_disabled');
//     buttonElement.disabled = true;
//   } else {
//     // иначе сделай кнопку активной
//     buttonElement.classList.remove('popup__button_disabled');
//     buttonElement.disabled = false;
//   }
// };

// enableValidation();

renderCards();

// Изменение информации профиля

buttonEdit.addEventListener('click', () => {
  openPopup(popupUserInfo);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;

});

buttonCloseUserInfo.addEventListener('click', () => {
  closePopup(popupUserInfo);
});

popupUserInfo.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
  closePopup(popupUserInfo);
  }
});

popupFormUser.addEventListener('submit', handleFormSubmitProfile);

// Новое место

buttonAdd.addEventListener('click', () => {
  openPopup(popupNewPlace);
});

buttonCloseNewPlace.addEventListener('click', () => {
  closePopup(popupNewPlace);
});

popupNewPlace.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupNewPlace);
  }
});

popupFormPlace.addEventListener('submit', submitCard);

// Попап с картинкой

buttonClosePicture.addEventListener('click', () => {
  closePopup(popupImage);
});
