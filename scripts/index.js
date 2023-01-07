const editButton = document.querySelector('.profile__edit-button');
const popupUserInfo = document.querySelector('.popup_modify_user-info');
const closeButtonUserInfo = popupUserInfo.querySelector('.popup__close-button_modify_user-info');
const popupEditFormUser = popupUserInfo.querySelector('.popup__edit-form_modify_user-info');
const nameInput = popupUserInfo.querySelector('.popup__field_type_name');
const jobInput = popupUserInfo.querySelector('.popup__field_type_job');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const popupNewPlace = document.querySelector('.popup_modify_new-place');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__box');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
const closeButtonNewPlace = popupNewPlace.querySelector('.popup__close-button_modify_new-place');
const popupEditFormPlace = popupNewPlace.querySelector('.popup__edit-form_modify_new-place');
const titlePlaceInput = popupNewPlace.querySelector('.popup__field_type_title-place');
const linkPlaceInput = popupNewPlace.querySelector('.popup__field_type_link-place');
const card = cardTemplate.cloneNode(true);
const likeButton = card.querySelector('.element__group');

const cardName = card.querySelector('.element__title');
const cardPhoto = card.querySelector('.element__mask-group');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
function addCardEventListeners (card) {
  const deleteButton = card.querySelector('.element__trash');
  const deleteCard = () => {
    card.remove();
  }

  deleteButton.addEventListener('click', deleteCard);
}

// Обработчик клика на кнопку-сердечко
function like (card) {
  const likeButton = card.querySelector('.element__group');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group_active'); // если класса нет - добавляем, если есть - убираем
  });
}

// Функция составления карточки из template
function createCard(fragment) {
  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.element__title');
  cardName.textContent = fragment.name;
  const cardPhoto = card.querySelector('.element__mask-group');
  cardPhoto.src = fragment.link;
  addCardEventListeners(card);
  like(card);
  return card;
}

// Отправка формы с данными новой карточки через использование createCard
function submitCard (evt) {
  evt.preventDefault();
  const objNewPlace = {name: titlePlaceInput.value, link: linkPlaceInput.value}
  createCard(objNewPlace);
  cardsContainer.prepend(card);
  popupEditFormPlace.reset();
  closePopup(popupNewPlace);
}

// Отправка формы с данными новой карточки
// function handleFormSubmitCard (evt) {
//   evt.preventDefault();
//   const card = cardTemplate.cloneNode(true);
//   const cardName = card.querySelector('.element__title');
//   const cardPhoto = card.querySelector('.element__mask-group');
//   cardName.textContent = titlePlaceInput.value;
//   cardPhoto.src = linkPlaceInput.value;
//   cardsContainer.prepend(card);
//   closePopup(popupNewPlace);
// }

// Вставка в шаблон из массива
function renderCards() {
  initialCards.forEach(item => {
    const readyCard = createCard(item);
    cardsContainer.append(readyCard);
  });
}

renderCards();

// Изменение информации профиля

editButton.addEventListener('click', () => {
  openPopup(popupUserInfo);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});

closeButtonUserInfo.addEventListener('click', () => {
  closePopup(popupUserInfo);
});

popupEditFormUser.addEventListener('submit', handleFormSubmitProfile);

// Новое место

addButton.addEventListener('click', () => {
  openPopup(popupNewPlace);
});

closeButtonNewPlace.addEventListener('click', () => {
  closePopup(popupNewPlace);
});

// popupEditFormPlace.addEventListener('submit', handleFormSubmitCard);
popupEditFormPlace.addEventListener('submit', submitCard);
