const buttonEdit = document.querySelector('.profile__edit-button');
const popupUserInfo = document.querySelector('.popup_modify_user-info');
const popupFormUser = document.forms['formAboutUser'];
const nameInput = popupUserInfo.querySelector('.popup__input_type_name');
const jobInput = popupUserInfo.querySelector('.popup__input_type_job');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const popupNewPlace = document.querySelector('.popup_modify_new-place');
const buttonAdd = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__box');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
const popupFormPlace = document.forms['formAboutPlace'];
const titlePlaceInput = popupNewPlace.querySelector('.popup__input_type_title-place');
const linkPlaceInput = popupNewPlace.querySelector('.popup__input_type_link-place');
const popupImage = document.querySelector('.popup_modify_image');
const picture = popupImage.querySelector('.popup__picture');
const pictureName = popupImage.querySelector('.popup__picture-name');
const buttonClose = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup')

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

// Отправка формы с данными профиля
function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupUserInfo);
};

// Функция удаления карточки (корзина)
function ejectCard (card) {
  const buttonDelete = card.querySelector('.element__trash');
  const deleteCard = () => {
    card.remove();
  }
  buttonDelete.addEventListener('click', deleteCard);
};

// Обработчик клика на кнопку-сердечко
function handleLikeClick(evt) {
  evt.target.classList.toggle('element__group_active'); // если класса нет - добавляем, если есть - убираем
};

function likeCard (card) {
  const buttonLike = card.querySelector('.element__group');
  buttonLike.addEventListener('click', handleLikeClick);
};

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
};

// Отправка формы с данными новой карточки через использование createCard
function submitCard (evt) {
  evt.preventDefault();
  const objNewPlace = {name: titlePlaceInput.value, link: linkPlaceInput.value}
  cardsContainer.prepend(createCard(objNewPlace));
  closePopup(popupNewPlace);
  popupFormPlace.reset();
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
