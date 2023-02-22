import { popupImage, initialCards, buttonEdit, popupUserInfo, popupFormUser, nameInput, jobInput, userName, userJob,
  popupNewPlace, buttonAdd, cardsContainer, cardTemplate, popupFormPlace, titlePlaceInput, linkPlaceInput, picture,
  pictureName, popups, validationConfig } from './constants.js';

import Card from './Card.js';

import FormValidator from './FormValidator.js';

function openPopup (popupVariant) {
  popupVariant.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup (popupVariant) {
  document.removeEventListener('keydown', closePopupEsc);
  popupVariant.classList.remove('popup_opened');
};

function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// Отдельная функция попапа-картинки
function handleCardClick(name, link) {
  picture.src = link;
  pictureName.textContent = name;
  picture.alt = `Фотография места ${name}`;
  openPopup(popupImage);
}

function createCard(item) {
  const card = new Card(item, '.template-card', handleCardClick);
  return card.createCard();
};

// Экземпляры класса валидации
const profileValidator = new FormValidator(validationConfig, popupFormUser);
profileValidator.enableValidation();
const сardValidator = new FormValidator(validationConfig, popupFormPlace);
сardValidator.enableValidation();

// Отправка формы с данными новой карточки через использование createCard
function submitCard (evt) {
  evt.preventDefault();
  const objNewPlace = {name: titlePlaceInput.value, link: linkPlaceInput.value}
  cardsContainer.prepend(createCard(objNewPlace));
  closePopup(popupNewPlace);
  popupFormPlace.reset();
};

// Отправка формы с данными профиля
function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupUserInfo);
};

// Вставка в шаблон из массива
function renderInitialCards() {
  initialCards.forEach(item => {
    const readyCard = createCard(item);
    cardsContainer.append(readyCard);
  });
};

renderInitialCards();

// Профиль
buttonEdit.addEventListener('click', () => {
  openPopup(popupUserInfo);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;

});

popupFormUser.addEventListener('submit', handleFormSubmitProfile);

// Новое место
buttonAdd.addEventListener('click', () => {
  openPopup(popupNewPlace);
});

popupFormPlace.addEventListener('submit', submitCard);

// Закрытие любого попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  });
});

export { openPopup, handleCardClick };
