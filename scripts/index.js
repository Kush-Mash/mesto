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
};

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
