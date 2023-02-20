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
  picture.src = cardData.link;
  pictureName.textContent = cardData.name;
  picture.alt = `Фотография места ${cardData.name}`;
  openPopup(popupImage);
}

function createCard(item) {
  const card = new Card(item, '.template-card', handleCardClick);

  return card.createCard();
};

// Отправка формы с данными новой карточки через использование createCard ---- ИЗМЕНИТЬ
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
function renderCards() {
  initialCards.forEach(item => {
    const readyCard = createCard(item);
    cardsContainer.append(readyCard);
  });
};

renderCards();

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
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  });
});

export {openPopup, handleCardClick};

import { popupImage, initialCards, buttonEdit, popupUserInfo, popupFormUser, nameInput, jobInput, userName, userJob,
  popupNewPlace, buttonAdd, cardsContainer, cardTemplate, popupFormPlace, titlePlaceInput, linkPlaceInput, picture,
  pictureName, popups } from './constants.js';

import Card from './Card.js';
