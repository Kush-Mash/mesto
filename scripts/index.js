const buttonEdit = document.querySelector('.profile__edit-button');
const popupUserInfo = document.querySelector('.popup_modify_user-info');
const buttonCloseUserInfo = popupUserInfo.querySelector('.popup__close-button_modify_user-info');
const popupEditFormUser = popupUserInfo.querySelector('.popup__edit-form_modify_user-info');
const nameInput = popupUserInfo.querySelector('.popup__field_type_name');
const jobInput = popupUserInfo.querySelector('.popup__field_type_job');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const popupNewPlace = document.querySelector('.popup_modify_new-place');
const buttonAdd = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__box');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
const buttonCloseNewPlace = popupNewPlace.querySelector('.popup__close-button_modify_new-place');
const popupEditFormPlace = popupNewPlace.querySelector('.popup__edit-form_modify_new-place');
const titlePlaceInput = popupNewPlace.querySelector('.popup__field_type_title-place');
const linkPlaceInput = popupNewPlace.querySelector('.popup__field_type_link-place');
const popupImage = document.querySelector('.popup-image');
const buttonClosePicture = popupImage.querySelector('.popup-image__close-button');
const picture = popupImage.querySelector('.popup-image__picture');
const pictureName = popupImage.querySelector('.popup-image__name');

function openPopup (popupVariant) {
  popupVariant.classList.add('popup_opened');
}

function closePopup (popupVariant) {
  popupVariant.classList.remove('popup_opened');
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
  popupEditFormPlace.reset();
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

popupEditFormUser.addEventListener('submit', handleFormSubmitProfile);

// Новое место

buttonAdd.addEventListener('click', () => {
  openPopup(popupNewPlace);
});

buttonCloseNewPlace.addEventListener('click', () => {
  closePopup(popupNewPlace);
});

popupEditFormPlace.addEventListener('submit', submitCard);

// Попап с картинкой

buttonClosePicture.addEventListener('click', () => {
  closePopup(popupImage);
});
